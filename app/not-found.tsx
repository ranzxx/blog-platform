import Link from "next/link";

export default function NotFound() {
    return (
      <div className="min-h-[calc(100vh-65px)] flex flex-col items-center justify-center px-4">
        <h1 className="font-serif text-6xl font-medium text-gray-200 mb-4">
          404
        </h1>
        <p className="text-gray-400 text-sm mb-6">page not found</p>
        <Link href="/" className="text-sm text-emerald-600 hover:underline">
          back to home →
        </Link>
      </div>
    );
}