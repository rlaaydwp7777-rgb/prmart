"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getAuth } from 'firebase-admin/auth';
import { adminAppInstance, adminDb } from '@/lib/firebaseAdmin';

// --- Form State ---
export type AuthState = {
  message: string;
  success: boolean;
  issues?: string[];
  fields?: Record<string, string>;
};


// --- Auth Actions ---
const signupSchema = z.object({
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다."),
});

export async function signUpAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  if (!adminAppInstance) {
    return { success: false, message: "[ACTION_SIGNUP_FAIL] Admin SDK not available." };
  }
  const rawData = Object.fromEntries(formData);
  const validatedFields = signupSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "입력 값을 다시 확인해주세요.",
      issues: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat() : [],
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const auth = getAuth(adminAppInstance);
    
    const userRecord = await auth.createUser({
        email,
        password,
        displayName: email.split('@')[0],
    });

    if (adminDb) {
      await adminDb.collection("users").doc(userRecord.uid).set({
        email,
        displayName: email.split('@')[0],
        role: 'user',
        createdAt: new Date().toISOString(),
      });
    }

    return { success: true, message: "회원가입에 성공했습니다! 로그인해주세요." };
    
  } catch (error: any) {
    console.error("[ACTION_SIGNUP_FAIL]", error);
    let message = "회원가입 중 오류가 발생했습니다.";
    if (error.code === 'auth/email-already-exists') {
        message = "이미 사용 중인 이메일입니다.";
    }
    return {
      success: false,
      message,
    };
  }
}
