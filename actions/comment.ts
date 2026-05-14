'use server'

import { db } from "@/db/drizzle";
import { comment, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function createComment({
  content,
  userId,
  postId,
}: {
  content: string;
  userId: string;
  postId: string;
}) {
  await db.insert(comment).values({ content, postId, userId });
  revalidatePath("/blog");
}

export async function getComments(postId: string) {
  return await db
    .select({
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt,
      authorName: user.name,
    })
    .from(comment)
    .leftJoin(user, eq(user.id, comment.userId))
    .where(eq(comment.postId, postId));
}

export async function deleteComment(id: string, postId: string) {
  await db.delete(comment).where(eq(comment.id, id))
  revalidatePath(`/blog/${postId}`)
}