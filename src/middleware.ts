// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAppInstance } from "./lib/firebaseAdmin";

function maskEmail(email?: string) {
  if (!email) return "unknown_email";
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 3) {
    return `${localPart}***@${domain}`;
  }
  return `${localPart.substring(0, 3)}***@${domain}`;
}

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isSellerRoute = pathname.startsWith("/seller");
  const isAccountRoute = pathname.startsWith("/account");

  if (isSellerRoute || isAccountRoute) {
    const token = req.cookies.get("firebaseIdToken")?.value;
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("continueUrl", pathname);

    if (!token) {
      console.warn(`[MW_TOKEN_MISSING] No token found for protected route: ${pathname}. Redirecting to login.`);
      loginUrl.searchParams.set("error", "session-expired");
      return NextResponse.redirect(loginUrl);
    }

    // Edge-friendly: Only check for token existence.
    // Deeper validation will be handled by server components or API routes using firebase-admin.
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = { matcher: ["/seller/:path*", "/account/:path*"] };
