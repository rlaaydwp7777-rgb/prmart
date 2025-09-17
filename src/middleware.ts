
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth as adminAuth } from 'firebase-admin';
import { app } from './lib/firebase/admin';

async function verifyToken(token: string) {
    if (!app) {
        console.error("Firebase Admin SDK not initialized in middleware!");
        return null;
    }
    try {
        const decodedToken = await adminAuth(app).verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.warn('Invalid or expired token in middleware:', error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/admin')) {
    const token = request.cookies.get('firebaseIdToken')?.value;

    if (!token) {
      console.log('Middleware: No token found, redirecting to login.');
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('continueUrl', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const decodedToken = await verifyToken(token);

    // Development backdoor for specific admin email
    if (decodedToken && decodedToken.email === 'prmart7777@gmail.com') {
      console.log(`Middleware: Admin user ${decodedToken.email} granted access.`);
      return NextResponse.next();
    }
    
    if (!decodedToken || decodedToken.role !== 'admin') {
      console.log('Middleware: Invalid token or not an admin, redirecting to home.');
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    console.log('Middleware: Admin user verified.');
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}
