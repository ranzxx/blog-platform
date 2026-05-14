'use server'

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import NavbarClient from "./navbar-client";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <nav className="flex items-center justify-between px-8 py-5 border-b border-gray-100">
      <Link href="/" className="font-serif text-lg font-medium tracking-tight">
        blog<span className="text-emerald-600 italic">.</span>
      </Link>

      <div className="flex items-center gap-6">
        <Link
          href="/blog"
          className="text-sm text-gray-500 hover:text-gray-900"
        >
          explore
        </Link>

        {session ? (
          <>
            <Link
              href="/blog/add"
              className="text-sm text-gray-500 hover:text-gray-900"
            >
              write
            </Link>
            <span className="text-sm text-gray-500">{session.user.name}</span>
            <NavbarClient />
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-sm px-4 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              sign in
            </Link>
            <Link
              href="/register"
              className="text-sm px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
            >
              start writing
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
