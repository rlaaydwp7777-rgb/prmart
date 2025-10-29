// src/app/api/admin/set-admin/route.ts
import { NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebaseAdmin';

export async function POST(request: Request) {
  if (!adminAuth) {
    return NextResponse.json({ error: 'Admin SDK not initialized' }, { status: 500 });
  }

  const { uid } = await request.json();
  if (!uid) {
    return NextResponse.json({ error: 'UID is required' }, { status: 400 });
  }

  try {
    await adminAuth.setCustomUserClaims(uid, { role: 'admin' });
    return NextResponse.json({ message: `Successfully made ${uid} an admin` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to set admin role' }, { status: 500 });
  }
}
