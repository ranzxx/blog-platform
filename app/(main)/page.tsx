import Link from "next/link";
import { db } from "@/db/drizzle";
import { user, post } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { getStats } from "@/actions/stats";

async function getRecentPosts() {
  const data = await db
    .select({
      id: post.id,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      authorName: user.name,
    })
    .from(post)
    .leftJoin(user, eq(user.id, post.userId))
    .orderBy(desc(post.createdAt))
    .limit(3);
  return data;
}

export default async function HomePage() {
  const recentPosts = await getRecentPosts();
  const stats = await getStats();

  return (
    <main>
      {/* Hero */}
      <section className="px-8 py-20 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full mb-6">
          a place for real writing
        </div>
        <h1 className="font-serif text-5xl font-medium leading-tight tracking-tight mb-5">
          where ideas find
          <br />
          their <em className="text-emerald-600">voice</em>
        </h1>
        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md">
          A calm space to write, share, and discover thoughtful content. No
          noise, no algorithm — just good writing from real people.
        </p>
        <div className="flex gap-3">
          <Link
            href="/register"
            className="px-6 py-3 bg-emerald-600 text-white text-sm font-medium rounded-md hover:bg-emerald-700"
          >
            start writing for free
          </Link>
          <Link
            href="/blog"
            className="px-6 py-3 border border-gray-200 text-gray-600 text-sm rounded-md hover:bg-gray-50"
          >
            browse posts
          </Link>
        </div>
      </section>

      {/* Stats */}
      <div className="grid grid-cols-2 mx-8 mb-12 border border-gray-100 rounded-xl overflow-hidden">
        {[
          { num: stats.user, label: "writers" },
          { num: stats.post, label: "posts published" },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-50 px-6 py-5">
            <div className="font-serif text-3xl font-medium mb-1">
              {stat.num}
            </div>
            <div className="text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="h-px bg-gray-100 mx-8" />

      {/* Recent Posts */}
      <section className="px-8 py-12">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="font-serif text-xl font-medium">recent posts</h2>
          <Link href="/blog" className="text-sm text-emerald-600">
            see all →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-xl overflow-hidden">
          {recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/blog/${post.id}`}
              className="bg-white p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="text-xs text-emerald-600 uppercase tracking-wider font-medium mb-2">
                article
              </div>
              <h3 className="font-serif text-base font-medium leading-snug mb-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-4 line-clamp-2">
                {post.content}
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-50 flex items-center justify-center text-xs font-medium text-emerald-700">
                  {post.authorName?.[0]?.toUpperCase()}
                </div>
                <span className="text-xs text-gray-400">{post.authorName}</span>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span className="text-xs text-gray-300">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="flex items-center justify-between px-8 py-5 border-t border-gray-100 mt-4">
        <span className="text-xs text-gray-300">
          © 2025 ink. all rights reserved.
        </span>
        <div className="flex gap-5">
          {["about", "privacy", "contact"].map((link) => (
            <span
              key={link}
              className="text-xs text-gray-300 hover:text-gray-400 cursor-pointer"
            >
              {link}
            </span>
          ))}
        </div>
      </footer>
    </main>
  );
}
