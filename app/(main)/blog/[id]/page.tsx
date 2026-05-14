import { getComments } from "@/actions/comment";
import { deletePost, getPostById } from "@/actions/post";
import CommentForm from "@/components/shared/comment-form";
import { post } from "@/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

interface PostDetailPageProps {
    params: Promise<{id: string}>
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const {id} = await params;
  const post = await getPostById(id);
  if(!post) notFound()

    const postComments = await getComments(id)

    const isAuthor = session?.user.id === post.userId;

    const deletePostWithId = deletePost.bind(null, id)

  return (
    <main className="px-8 py-12 max-w-2xl mx-auto">
      {/* Post Header */}
      <div className="mb-10">
        <h1 className="font-serif text-4xl font-medium leading-tight mb-4">
          {post.title}
        </h1>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-emerald-50 flex items-center justify-center text-xs font-medium text-emerald-700">
              {post.userId?.[0]?.toUpperCase()}
            </div>
            <span className="text-sm text-gray-500">{post.userId}</span>
            <div className="w-1 h-1 rounded-full bg-gray-200" />
            <span className="text-sm text-gray-300">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {isAuthor && (
            <div className="flex gap-3">
              <Link
                href={`/blog/${id}/edit`}
                className="text-sm text-gray-400 hover:text-gray-600"
              >
                edit
              </Link>
              <form action={deletePostWithId}>
                <button
                  type="submit"
                  className="text-sm text-red-400 hover:text-red-600"
                >
                  delete
                </button>
              </form>
            </div>
          )}
        </div>
      </div>

      <div className="h-px bg-gray-100 mb-10" />

      {/* Post Content */}
      <div className="prose prose-gray max-w-none mb-16">
        <p className="text-gray-700 leading-relaxed text-base whitespace-pre-wrap">
          {post.content}
        </p>
      </div>

      <div className="h-px bg-gray-100 mb-10" />

      {/* Comments */}
      <section>
        <h2 className="font-serif text-xl font-medium mb-8">
          {postComments.length} comments
        </h2>

        {session && <CommentForm postId={id} userId={session.user.id} />}

        {!session && (
          <p className="text-sm text-gray-400 mb-8">
            <Link href="/login" className="text-emerald-600">
              sign in
            </Link>{" "}
            to leave a comment
          </p>
        )}

        <div className="divide-y divide-gray-100 mt-8">
          {postComments.map((comment) => (
            <div key={comment.id} className="py-5">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-xs font-medium text-emerald-700">
                  {comment.authorName?.[0]?.toUpperCase()}
                </div>
                <span className="text-xs font-medium text-gray-600">
                  {comment.authorName}
                </span>
                <div className="w-1 h-1 rounded-full bg-gray-200" />
                <span className="text-xs text-gray-300">
                  {new Date(comment.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed">
                {comment.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}