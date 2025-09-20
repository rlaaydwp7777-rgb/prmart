// src/app/api/admin/set-admin/route.ts (POST { email })
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(req: NextRequest) {
  // IMPORTANT: In a real production app, you MUST protect this endpoint.
  // For example, by checking if the request comes from an already authenticated admin.
  // This is omitted here for simplicity.
  
  try {
    if (!adminAuth) {
      return NextResponse.json({ error: "[API_SET_ADMIN_FAIL] Admin Auth not initialized." }, { status: 500 });
    }
    const body = await req.json();
    const email = body.email;
    if (!email) {
      return NextResponse.json({ error: "[API_SET_ADMIN_FAIL] Email is required." }, { status: 400 });
    }

    const user = await adminAuth.getUserByEmail(email);
    await adminAuth.setCustomUserClaims(user.uid, { role: "admin" });
    
    // optional: write to users collection to keep data in sync
    if (adminDb) {
      await adminDb.collection("users").doc(user.uid).set({ role: "admin" }, { merge: true });
    }
    
    return NextResponse.json({ ok: true, message: `Admin role granted to ${email}` });
  } catch (err: any) {
    console.error("[API_SET_ADMIN_FAIL] set-admin-claim error:", err);
    return NextResponse.json({ error: err.message || "An unknown error occurred" }, { status: 500 });
  }
}
