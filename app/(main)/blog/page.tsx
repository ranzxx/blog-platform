import Link from "next/link";
import { db } from "@/db/drizzle";
import { post, user } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

async function getAllPosts() {
  const data = await db
    .select({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      authorName: user.name,
      authorId: post.userId,
    })
    .from(post)
    .leftJoin(user, eq(user.id, post.userId))
    .orderBy(desc(post.createdAt));
  return data;
}

export default async function BlogPage() {
  const allPosts = await getAllPosts();

  return (
    <main className="px-8 py-12 max-w-3xl mx-auto">
      <div className="flex items-baseline justify-between mb-10">
        <h1 className="font-serif text-3xl font-medium">all posts</h1>
        <Link
          href="/blog/add"
          className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
        >
          write a post
        </Link>
      </div>

      {allPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400 text-sm">
            no posts yet. be the first to write.
          </p>
          <Link
            href="/blog/new"
            className="text-emerald-600 text-sm mt-2 inline-block"
          >
            write something →
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-gray-100">
          {allPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="flex flex-col py-8 hover:opacity-70 transition-opacity"
            >
              <h2 className="font-serif text-xl font-medium mb-2 leading-snug">
                {post.title}
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                {post.content}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-xs font-medium text-emerald-700">
                  {post.authorName?.[0]?.toUpperCase()}
                </div>
                <span className="text-xs text-gray-400">{post.authorName}</span>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span className="text-xs text-gray-300">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
