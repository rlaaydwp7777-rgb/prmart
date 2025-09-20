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
      return NextResponse.redirect(loginUrl);
    }

    try {
      if (!adminAppInstance) {
        console.warn("Admin SDK not available in middleware. Access denied.");
        return NextResponse.redirect(new URL("/", req.url));
      }
      const decoded = await adminAppInstance.auth().verifyIdToken(token);
      
      // For both /admin and /seller, require 'admin' role
      if (decoded.role === "admin") {
        return NextResponse.next();
      } else {
        console.warn(`User ${decoded.email} with role '${decoded.role || 'user'}' attempted to access ${pathname}. Denied.`);
        return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admins to home
      }
    } catch (err: any) {
      console.warn("Middleware token verification failed:", err.code);
      // If token is expired or invalid, redirect to login
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/seller/:path*"] };
