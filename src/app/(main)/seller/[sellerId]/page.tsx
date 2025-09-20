import { NextResponse, type NextRequest } from 'next/server'
import { app } from '@/lib/firebase/admin';
import { getAuth } from 'firebase-admin/auth';

export async function middleware(request: NextRequest) {
  // Admin route protection
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const idToken = request.cookies.get('firebaseIdToken')?.value;

    if (!idToken) {
      console.log('Middleware: No token, redirecting to home.');
      return NextResponse.redirect(new URL('/', request.url));
    }

    try {
      const decodedToken = await getAuth(app).verifyIdToken(idToken);

      // IMPORTANT: Using a specific email for admin access as a temporary measure.
      // This should be replaced with Custom Claims for a more robust solution.
      if (decodedToken.email !== 'prmart7777@gmail.com') {
        console.log(`Middleware: User ${decodedToken.email} is not admin. Redirecting.`);
        return NextResponse.redirect(new URL('/', request.url));
      }
      
      // User is the admin, allow access.
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware: Token verification failed', error);
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  // Seller route protection (currently disabled as auth is removed)
  if (request.nextUrl.pathname.startsWith('/seller')) {
      // Since login is removed, we can just redirect or show a placeholder
      // For now, let's redirect to home to avoid confusion.
      return NextResponse.redirect(new URL('/', request.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*'],
};