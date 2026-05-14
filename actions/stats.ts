import { db } from "@/db/drizzle";
import { post, user } from "@/db/schema";
import { count } from "drizzle-orm";

export async function getStats() {
    const [userCount] = await db.select({ count: count() }).from(user);
    const [postCount] = await db.select({ count: count() }).from(post);

    return {
        user: userCount.count,
        post: postCount.count,
    }
}