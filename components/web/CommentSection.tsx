"use client";

import { commentSchema } from "@/app/schemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessagesSquare } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";

export const CommentSection = () => {
  const form = useForm({
    defaultValues: {
      body: "",
      postId: "",
    },
    resolver: zodResolver(commentSchema),
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-2 border-b">
        <MessagesSquare className="size-5" />
        <h2 className="text-xl font-bold">5 Comments</h2>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <Controller
            name="body"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Textarea
                  placeholder="Share your thoughts..."
                  {...field}
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Button>Submit</Button>
        </form>
      </CardContent>
    </Card>
  );
};
