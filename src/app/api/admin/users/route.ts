// src/app/api/admin/users/route.ts
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function GET() {
  if (!adminAuth) {
    return NextResponse.json({ error: 'Admin SDK not initialized' }, { status: 500 });
  }

  try {
    const userRecords = await adminAuth.listUsers();
    const users = userRecords.users.map((user) => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      customClaims: user.customClaims,
    }));
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to list users' }, { status: 500 });
  }
}
