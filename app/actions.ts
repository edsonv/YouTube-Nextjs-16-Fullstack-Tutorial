"use server";

import { api } from "@/convex/_generated/api";
import { getToken } from "@/lib/auth-server";
import { fetchMutation } from "convex/nextjs";
import { redirect } from "next/navigation";
import z from "zod";
import { postSchema } from "./schemas/blog";

export async function createBlogAction(data: z.infer<typeof postSchema>) {
  const parsed = postSchema.safeParse(data);

  if (!parsed.success) {
    throw new Error("Something went wrong");
  }

  const token = await getToken();

  await fetchMutation(
    api.posts.createPost,
    {
      title: parsed.data.title,
      body: parsed.data.content,
    },
    {
      token,
    }
  );

  return redirect("/");
}
