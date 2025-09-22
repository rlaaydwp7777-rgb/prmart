// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAppInstance } from "./src/lib/firebaseAdmin";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isAdminRoute = pathname.startsWith("/admin");
  const isSellerRoute = pathname.startsWith("/seller");
  const isAccountRoute = pathname.startsWith("/account"); // 추가

  if (isAdminRoute || isSellerRoute || isAccountRoute) {
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
        // 관리자 SDK가 없으면 어떤 보호 경로도 접근 불가
        return NextResponse.redirect(new URL("/", req.url));
      }
      const decoded = await adminAppInstance.auth().verifyIdToken(token);
      
      // /account 경로는 로그인만 하면 누구나 접근 가능
      if (isAccountRoute) {
        return NextResponse.next();
      }

      // /admin 경로는 'admin' 역할만 접근 가능
      if (isAdminRoute) {
        if (decoded.role === "admin") {
          return NextResponse.next();
        } else {
           console.warn(`[MW_ACCESS_DENIED] User ${decoded.email} with role '${decoded.role || 'user'}' attempted to access admin route ${pathname}. Denied.`);
           return NextResponse.redirect(new URL("/", req.url));
        }
      }

      // /seller 경로는 'admin' 또는 'seller' 역할만 접근 가능
      if (isSellerRoute) {
        if (decoded.role === "admin" || decoded.role === "seller") {
          return NextResponse.next();
        } else {
           console.warn(`[MW_ACCESS_DENIED] User ${decoded.email} with role '${decoded.role || 'user'}' attempted to access seller route ${pathname}. Denied.`);
           return NextResponse.redirect(new URL("/", req.url));
        }
      }

    } catch (err: any) {
      console.error(`[MW_TOKEN_VERIFY_FAIL] Token verification failed for ${pathname}:`, err.code);
      // 토큰이 만료되었거나 유효하지 않으면 로그인 페이지로 리디렉션
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/seller/:path*", "/account/:path*"] };
