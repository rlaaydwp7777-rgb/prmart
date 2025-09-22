
// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAppInstance } from "./src/lib/firebaseAdmin";

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

  const isAdminRoute = pathname.startsWith("/admin");
  const isSellerRoute = pathname.startsWith("/seller");
  const isAccountRoute = pathname.startsWith("/account");

  if (isAdminRoute || isSellerRoute || isAccountRoute) {
    const token = req.cookies.get("firebaseIdToken")?.value;
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("continueUrl", pathname);

    if (!token) {
      console.warn(`[MW_TOKEN_MISSING] No token found for protected route: ${pathname}. Redirecting to login.`);
      return NextResponse.redirect(loginUrl);
    }

    try {
      if (!adminAppInstance) {
        console.error("[MW_ADMIN_SDK_MISSING] Admin SDK not available in middleware. Access denied.");
        return NextResponse.redirect(new URL("/", req.url));
      }
      const decoded = await adminAppInstance.auth().verifyIdToken(token);
      
      if (!decoded) {
        console.warn(`[MW_ACCESS_DENIED] Unauthenticated attempt to access ${pathname}`);
        return NextResponse.redirect(loginUrl);
      }

      // /account is accessible to any logged-in user.
      if (isAccountRoute) {
        return NextResponse.next();
      }

      // /admin is only for 'admin' role.
      if (isAdminRoute) {
        if (decoded?.role === "admin") {
          return NextResponse.next();
        } else {
           console.warn(`[MW_ACCESS_DENIED] User ${maskEmail(decoded.email)} with role '${decoded?.role || 'user'}' attempted to access admin route ${pathname}. Denied.`);
           return NextResponse.redirect(new URL("/", req.url));
        }
      }

      // /seller is for 'admin' or 'seller' roles.
      if (isSellerRoute) {
        if (decoded?.role === "admin" || decoded?.role === "seller") {
          return NextResponse.next();
        } else {
           console.warn(`[MW_ACCESS_DENIED] User ${maskEmail(decoded.email)} with role '${decoded?.role || 'user'}' attempted to access seller route ${pathname}. Denied.`);
           return NextResponse.redirect(new URL("/", req.url));
        }
      }

    } catch (err: any) {
      console.error(`[MW_TOKEN_VERIFY_FAIL] path=${pathname}, code=${err.code || 'N/A'}, message=${err.message || 'Unknown error'}`);
      // If token is expired or invalid, redirect to login
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = { matcher: ["/admin/:path*", "/seller/:path*", "/account/:path*"] };
