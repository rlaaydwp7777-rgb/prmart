// src/app/api/admin/set-admin/route.ts (POST { email })
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { setAdminClaimByEmail } from "@/lib/services";

export async function POST(req: NextRequest) {
  // IMPORTANT: In a real production app, you MUST protect this endpoint.
  // For example, by checking if the request comes from an already authenticated admin.
  // This is omitted here for simplicity.
  
  try {
    const body = await req.json();
    const email = body.email;
    if (!email) {
      return NextResponse.json({ error: "Email is required [API_SET_ADMIN_1]" }, { status: 400 });
    }

    await setAdminClaimByEmail(email);
    
    return NextResponse.json({ ok: true, message: `Admin role granted to ${email}` });
  } catch (err: any) {
    console.error("[API_SET_ADMIN_FAIL] set-admin-claim error:", err);
    return NextResponse.json({ error: err.message || "An unknown error occurred" }, { status: 500 });
  }
}
