// src/app/api/admin/list-users/route.ts
import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function GET() {
  // IMPORTANT: In a real production app, you MUST protect this endpoint.
  // For example, by checking if the request comes from an already authenticated admin.
  // This is omitted here for simplicity.
  try {
    if (!adminAuth) {
        return NextResponse.json({ error: "[API_LIST_USERS_FAIL] Admin Auth not initialized." }, { status: 500 });
    }
    const res = await adminAuth.listUsers(1000);
    const users = res.users.map(u => ({
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        customClaims: u.customClaims,
        photoURL: u.photoURL,
    }));
    return NextResponse.json({ users });
  } catch (err: any) {
    console.error("[API_LIST_USERS_FAIL] list-users error:", err);
    return NextResponse.json({ error: err.message || "An unknown error occurred" }, { status: 500 });
  }
}
