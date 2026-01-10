"use client";

import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";

export default function BlogPage() {
  const data = useQuery(api.posts.getPosts);

  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights, thoughs and trends from our team!
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.map((post) => (
          <Card key={post._id}>
            <div>
              <Image
                src={`https://plus.unsplash.com/premium_photo-1683141465789-23ccb971c064?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`}
                alt={post.title}
                width={687}
                height={500}
              />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
