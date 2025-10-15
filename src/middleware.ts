import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // /admin 경로 보호
  if (request.nextUrl.pathname.startsWith("/admin")) {
    const token = request.cookies.get("firebaseIdToken")?.value;

    if (!token) {
      console.log("No token found, redirecting to home");
      return NextResponse.redirect(new URL("/", request.url));
    }

    try {
      // Admin SDK 동적 import (서버 전용)
      const { adminAuth } = await import("@/lib/firebaseAdmin");
      
      const decodedToken = await adminAuth.verifyIdToken(token);
      
      // role 확인
      // @ts-ignore
      if (decodedToken.role !== "admin") {
        console.log("User is not admin, redirecting");
        return NextResponse.redirect(new URL("/", request.url));
      }

      // 관리자 확인됨, 계속 진행
      return NextResponse.next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
