// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAccountRoute = pathname.startsWith("/account");

  if (isAccountRoute) {
    const token = req.cookies.get("firebaseIdToken")?.value;
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("continueUrl", pathname);

    if (!token) {
      console.warn(`[MW_TOKEN_MISSING] No token found for protected route: ${pathname}. Redirecting to login.`);
      loginUrl.searchParams.set("error", "session-expired");
      return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = { matcher: ["/account/:path*"] };
