// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected =
    pathname.startsWith("/admin") ||
    pathname.startsWith("/seller") ||
    pathname.startsWith("/account");

  if (!isProtected) {
    return NextResponse.next();
  }

  const token = req.cookies.get("firebaseIdToken")?.value;
  const loginUrl = new URL("/login", req.url);
  loginUrl.searchParams.set("continueUrl", pathname);

  if (!token) {
    loginUrl.searchParams.set("error", "no-token");
    console.warn(
      `[MW_TOKEN_MISSING] No token for protected route ${pathname}. Redirecting to login.`
    );
    return NextResponse.redirect(loginUrl);
  }

  // Edge-friendly: Only check for token existence.
  // Deeper validation will be handled by server components or API routes.
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/seller/:path*", "/account/:path*"],
};
