import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from 'firebase-admin';
import { app } from './lib/firebase/admin'; // Make sure you have firebase-admin initialized

// Initialize Firebase Admin SDK if not already
if (!app) {
    console.error("Firebase Admin SDK not initialized!");
}

async function verifyToken(token: string) {
    try {
        const decodedToken = await auth(app).verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.warn('Invalid or expired token:', error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('firebaseIdToken')?.value;

    if (!token) {
      console.log('No token found, redirecting to login.');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const decodedToken = await verifyToken(token);

    if (!decodedToken || decodedToken.role !== 'admin') {
      console.log('Invalid token or not an admin, redirecting to home.');
      return NextResponse.redirect(new URL('/', request.url));
    }
    
    console.log('Admin user verified.');
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/admin/:path*',
}
