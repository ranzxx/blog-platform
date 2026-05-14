'use client'

import { updatePost } from "@/actions/post";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { EditPostSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

interface EditFormProps {
    post: { id: string, title: string, content: string }
}

export default function EditForm({ post }: EditFormProps) {
    const router = useRouter();

    const form = useForm<z.infer<typeof EditPostSchema>>({
        resolver: zodResolver(EditPostSchema),
        defaultValues: {
          title: post.title,
          content: post.content,
        },
    });

    async function onSubmit(data: z.infer<typeof EditPostSchema>) {
        await updatePost(post.id, data.title, data.content);
        router.push(`/blog/${post.id}`);
        router.refresh();
    }
    
    return (
      <main className="px-8 py-12 max-w-2xl mx-auto">
        <div className="mb-10">
          <h1 className="font-serif text-3xl font-medium mb-2">edit post</h1>
        </div>

        <form id="edit-post-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>title</FieldLabel>
                  <Input {...field} aria-invalid={fieldState.invalid} />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="content"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>content</FieldLabel>
                  <InputGroup>
                    <InputGroupTextarea
                      {...field}
                      rows={12}
                      className="resize-none"
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

        <div className="flex gap-3 pt-6 border-t border-gray-100 mt-6">
          <Button
            type="submit"
            form="edit-post-form"
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {form.formState.isSubmitting ? "saving..." : "save changes"}
          </Button>
          <Button
            type="button"
            variant={"outline"}
            onClick={() => router.back()}
          >
            cancel
          </Button>
        </div>
      </main>
    );
}