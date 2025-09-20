// src/app/api/admin/list-users/route.ts
import { NextResponse } from "next/server";
import { listAllUsers } from "@/lib/services";

export async function GET() {
  // IMPORTANT: In a real production app, you MUST protect this endpoint.
  // For example, by checking if the request comes from an already authenticated admin.
  // This is omitted here for simplicity.
  try {
    const users = await listAllUsers();
    return NextResponse.json({ users });
  } catch (err: any) {
    console.error("list-users error:", err);
    return NextResponse.json({ error: err.message || "An unknown error occurred" }, { status: 500 });
  }
}
