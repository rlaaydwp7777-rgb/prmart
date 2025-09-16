import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // This is a basic security measure.
  // In a real application, you would verify the user's JWT and check for an 'admin' role (e.g., from Firebase Custom Claims).
  // For now, we will redirect any attempt to access the /admin route.
  if (request.nextUrl.pathname.startsWith('/admin')) {
     console.log('Admin route access attempt blocked by middleware.');
     // Redirect to home page if not an admin.
     return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
}
