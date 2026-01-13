"use server";

import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import z from "zod";
import { postSchema } from "./schemas/blog";

export async function createBlogAction(data: z.infer<typeof postSchema>) {
  try {
    const parsed = postSchema.safeParse(data);

    if (!parsed.success) {
      throw new Error("Something went wrong");
    }

    const token = await getToken();
    const imageUrl = await fetchMutation(
      api.posts.generateImageUploadUrl,
      {},
      { token }
    );

    const uploadResult = await fetch(imageUrl, {
      method: "POST",
      headers: {
        "Content-Type": parsed.data.image.type,
      },
      body: parsed.data.image,
    });

    if (!uploadResult.ok) {
      return {
        error: "Failed to upload image",
      };
    }

    const { storageId } = await uploadResult.json();

    await fetchMutation(
      api.posts.createPost,
      {
        title: parsed.data.title,
        body: parsed.data.content,
        imageStorageId: storageId,
      },
      {
        token,
      }
    );
  } catch {
    return {
      error: "Failed to create post",
    };
  }

  revalidatePath("/blog");
  return redirect("/blog");
}
