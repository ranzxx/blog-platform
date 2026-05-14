"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { createPost } from "@/actions/post";
import { PostSchema } from "@/schemas";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupTextarea } from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";

export default function NewPostPage() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  async function onSubmit(data: z.infer<typeof PostSchema>) {
    if (!session) return;
    await createPost({
      title: data.title,
      content: data.content,
      userId: session.user.id,
    });
    router.push("/blog");
    router.refresh();
  }

  return (
    <main className="px-8 py-12 max-w-2xl mx-auto">
      <div className="mb-10">
        <h2 className="font-serif text-3xl font-medium mb-2">
          write something
        </h2>
        <p className="text-sm text-gray-400">
          share your thoughts with the world
        </p>
      </div>

      <form
        id="add-post"
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
      >
        <FieldGroup>
          <Controller
            name="title"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Title</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="your post title"
                  aria-invalid={fieldState.invalid}
                />
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
                <FieldLabel>Content</FieldLabel>
                <InputGroup>
                  <InputGroupTextarea
                    {...field}
                    placeholder="tell your story..."
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
          form="add-post"
          className="bg-emerald-600 hover:bg-emerald-700"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "publishing..." : "publish"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          cancel
        </Button>
      </div>
    </main>
  );
}
