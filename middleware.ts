// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAppInstance } from "./src/lib/firebaseAdmin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isSellerRoute = pathname.startsWith("/seller");

  if (isAdminRoute || isSellerRoute) {
    const token = req.cookies.get("firebaseIdToken")?.value;
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("continueUrl", pathname);

    if (!token) {
      console.warn(`[MW_TOKEN_MISSING] No token found for protected route: ${pathname}`);
      return NextResponse.redirect(loginUrl);
    }

    try {
      if (!adminAppInstance) {
        console.error("[MW_ADMIN_SDK_MISSING] Admin SDK not available in middleware. Access denied.");
        return NextResponse.redirect(new URL("/", req.url));
      }
      const decoded = await adminAppInstance.auth().verifyIdToken(token);
      
      // For both /admin and /seller, require 'admin' role
      if (decoded.role === "admin") {
        return NextResponse.next();
      } else {
        console.warn(`[MW_ACCESS_DENIED] User ${decoded.email} with role '${decoded.role || 'user'}' attempted to access ${pathname}. Denied.`);
        return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admins to home
      }
    } catch (err: any) {
      console.error(`[MW_TOKEN_VERIFY_FAIL] Token verification failed for ${pathname}:`, err.code);
      // If token is expired or invalid, redirect to login
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/seller/:path*"] };
