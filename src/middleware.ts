
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth as adminAuth } from 'firebase-admin';
import { app } from './lib/firebase/admin';

async function verifyToken(token: string) {
    if (!app) {
        console.error("Middleware Error: Firebase Admin SDK not initialized! Cannot verify token.");
        return null;
    }
    try {
        const decodedToken = await adminAuth(app).verifyIdToken(token);
        return decodedToken;
    } catch (error: any) {
        console.warn('Middleware Warning: Invalid or expired token.', error?.message);
        return null;
    }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('firebaseIdToken')?.value;

    if (!token) {
      console.log('Middleware: No token found. Redirecting to login.');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('continueUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken) {
       console.log('Middleware: Token verification failed. Redirecting to login.');
       const loginUrl = new URL('/login', request.url);
       loginUrl.searchParams.set('continueUrl', pathname);
       return NextResponse.redirect(loginUrl);
    }
    
    // Check for admin role using Custom Claims.
    if (decodedToken.role === 'admin') {
      console.log(`Middleware: Admin user ${decodedToken.email} granted access to ${pathname}.`);
      return NextResponse.next();
    }
    
    // If not an admin, redirect to home page.
    console.log(`Middleware: Access denied for ${decodedToken.email}. User is not an admin. Redirecting to home.`);
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}
