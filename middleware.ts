import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";

const authRoutes = ['/login', '/register'];
const protectedRoutes = ['/blog'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const isLoggedIn = !!session?.user;
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/blog", request.url));
  }

  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL("/login", request.url);
    // Simpan tujuan asal supaya bisa redirect setelah login
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
