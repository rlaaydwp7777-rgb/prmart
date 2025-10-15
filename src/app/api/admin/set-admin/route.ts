import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { adminAppInstance, adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: NextRequest) {
  try {
    if (!adminAppInstance) {
      return NextResponse.json(
        { error: "Admin SDK not initialized" },
        { status: 500 }
      );
    }

    const { uid } = await request.json();

    if (!uid) {
      return NextResponse.json(
        { error: "UID is required" },
        { status: 400 }
      );
    }

    const auth = getAuth(adminAppInstance);

    // 1. Custom Claims 설정
    await auth.setCustomUserClaims(uid, { role: "admin" });

    // 2. Firestore에도 동기화 (update 대신 set(..., { merge: true }) 사용)
    await adminDb.collection("users").doc(uid).set({
      role: "admin",
      updatedAt: new Date().toISOString(),
    }, { merge: true });

    return NextResponse.json({
      success: true,
      message: `사용자 ${uid}에게 관리자 권한이 부여되었습니다.`,
    });
  } catch (error: any) {
    console.error("관리자 권한 부여 실패:", error);
    return NextResponse.json(
      { error: error.message || "권한 부여 실패" },
      { status: 500 }
    );
  }
}
