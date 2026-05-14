import z from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z.string().trim().min(1, "Password is required"),
});

export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Invalid email format"),
  password: z
    .string()
    .trim()
    .min(1, "Password is required")
    .min(8, "Password must be 8 char"),
});

export const PostSchema = z.object({
  title: z.string().min(3, "judul minimal 3 karakter").max(100),
  content: z.string().min(10, "konten minimal 10 karakter"),
});

export const CommentSchema = z.object({
  content: z.string().min(1, 'Comment is required')
})

export const EditPostSchema = z.object({
  title: z.string().min(3, "Title must be 3 characters").max(100),
  content: z.string().min(10, "Content must be 10 characters"),
});