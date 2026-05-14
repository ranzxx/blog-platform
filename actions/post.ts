"use server";

import { db } from "@/db/drizzle";
import { post } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost({
  title,
  content,
  userId,
}: {
  title: string;
  content: string;
  userId: string;
}) {
  await db.insert(post).values({ title, content, userId });
  revalidatePath("/blog");
}

export async function getPosts() {
  return await db.select().from(post);
}

export async function getPostById(id: string) {
  const data = await db.select().from(post).where(eq(post.id, id));
  return data[0];
}

export async function updatePost(id: string, title: string, content: string) {
  await db.update(post).set({ title, content }).where(eq(post.id, id));
  revalidatePath("/blog");
  revalidatePath(`/blog/${id}`);
}

export async function deletePost(id: string) {
  await db.delete(post).where(eq(post.id, id));
  revalidatePath("/blog");
  redirect("/blog");
}
