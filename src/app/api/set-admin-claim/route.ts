import { NextResponse } from 'next/server';
import { admin } from '@/lib/firebase/admin';
import { getAuth } from 'firebase-admin/auth';

export async function POST(request: Request) {
  // IMPORTANT: This endpoint is for development purposes only.
  // It should be secured or removed in production.
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json({ error: 'This endpoint is only available in development mode.' }, { status: 403 });
  }

  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required.' }, { status: 400 });
    }

    const auth = getAuth(admin);
    const user = await auth.getUserByEmail(email);
    
    if (!user) {
        return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Set custom claim for the user
    await auth.setCustomUserClaims(user.uid, { role: 'admin' });

    return NextResponse.json({ message: `Custom claim 'admin' set for ${email}` });
  } catch (error: any) {
    console.error('Error setting custom claim:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
