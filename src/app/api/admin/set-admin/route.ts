// src/app/api/admin/set-admin/route.ts (POST { email })
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";
import { setAdminClaimByEmail } from "@/lib/services";

export async function POST(req: NextRequest) {
  // IMPORTANT: In a real production app, you MUST protect this endpoint.
  // For example, by checking if the request comes from an already authenticated admin.
  // This is omitted here for simplicity.
  
  try {
    const body = await req.json();
    const email = body.email;
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }
    if (!adminAuth) {
      return NextResponse.json({ error: "Admin SDK not initialized" }, { status: 500 });
    }

    const user = await setAdminClaimByEmail(email);
    console.log(`Successfully set admin claim for ${user.email} (UID: ${user.uid})`);
    
    return NextResponse.json({ ok: true, message: `Admin role granted to ${email}` });
  } catch (err: any) {
    console.error("set-admin-claim error:", err);
    return NextResponse.json({ error: err.message || "An unknown error occurred" }, { status: 500 });
  }
}
