
import { NextResponse, type NextRequest } from 'next/server';
import { auth as adminAuth } from 'firebase-admin';
import { app } from '@/lib/firebase/admin';

/**
 * WARNING: This route is for development purposes only.
 * It allows setting a custom 'admin' claim on a user.
 * Ensure this is properly secured or removed in production.
 */
export async function POST(request: NextRequest) {
  // IMPORTANT: Secure this endpoint in a real-world application.
  // This is a simplified example for development.
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'This endpoint is for development only' }, { status: 403 });
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const auth = adminAuth(app);
    const user = await auth.getUserByEmail(email);
    await auth.setCustomUserClaims(user.uid, { role: 'admin' });

    return NextResponse.json({ message: `Successfully set admin claim for ${email}` });
  } catch (error: any) {
    console.error('Error setting custom claim:', error);
    return NextResponse.json({ error: error.message || 'An unknown error occurred' }, { status: 500 });
  }
}
