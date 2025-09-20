import { NextResponse, type NextRequest } from 'next/server';
import { admin } from '@/lib/firebase/admin';
import { getAuth } from 'firebase-admin/auth';

async function verifyToken(token: string) {
    try {
        const decodedToken = await getAuth(admin).verifyIdToken(token);
        return decodedToken;
    } catch (error) {
        console.error('Middleware: Token verification failed', error);
        return null;
    }
}

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isProtectedRoute = pathname.startsWith('/admin') || pathname.startsWith('/seller');
    
    if (isProtectedRoute) {
        const idToken = request.cookies.get('firebaseIdToken')?.value;

        if (!idToken) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            url.searchParams.set('continueUrl', pathname);
            return NextResponse.redirect(url);
        }

        const decodedToken = await verifyToken(idToken);

        if (!decodedToken) {
            const url = request.nextUrl.clone();
            url.pathname = '/login';
            url.searchParams.set('continueUrl', pathname);
            return NextResponse.redirect(url);
        }

        // Custom Claims-based authorization for admin routes
        if (pathname.startsWith('/admin')) {
            if (decodedToken.role !== 'admin') {
                console.log(`Middleware: User ${decodedToken.email} is not an admin. Redirecting.`);
                return NextResponse.redirect(new URL('/', request.url));
            }
        }
        
        // Any logged-in user can access /seller routes for now
        // More specific roles can be added later (e.g., 'seller' role)
    }

    return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/seller/:path*', '/account/:path*'],
};
