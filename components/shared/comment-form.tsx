'use client'

import { Controller, useForm } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { InputGroup, InputGroupTextarea } from "../ui/input-group";
import z from "zod";
import { CommentSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { createComment } from "@/actions/comment";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export default function CommentForm({ postId, userId }: { postId: string, userId: string }) {
  const router = useRouter();
    const form = useForm<z.infer<typeof CommentSchema>>({
    resolver: zodResolver(CommentSchema),
    defaultValues: {
      content: "",
    },
  });

  async function onSubmit(values: z.infer<typeof CommentSchema>) {
    await createComment({
      content: values.content,
      postId,
      userId,
    })
    form.reset();
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <form
        id="add-comment"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="content"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Content</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    placeholder="write a comment..."
                    rows={3}
                    className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-md outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 resize-none"
                    aria-invalid={fieldState.invalid}
                  />
                </InputGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Button
        type="submit"
        form="add-comment"
        className="px-4 py-2 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 disabled:opacity-50"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? "posting..." : "post comment"}
      </Button>
    </div>
  );
}