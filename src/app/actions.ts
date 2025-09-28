
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { adminAppInstance, adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { getCategories } from "@/lib/firebase/services";
import type { Prompt, IdeaRequest, Category, Proposal } from "@/lib/types";

// --- Form State ---
export type FormState = {
  message: string;
  success: boolean;
  issues?: string[];
  fields?: Record<string, string>;
};

// --- Auth Actions ---
const signupSchema = z.object({
  uid: z.string().optional(), // For Google Sign in
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다.").optional(),
  displayName: z.string().optional(), // For Google Sign in
  photoURL: z.string().optional(), // For Google Sign in
  isGoogleSignIn: z.string().optional(), // Flag for Google Sign in
});

export async function signUpAction(prevState: FormState, formData: FormData): Promise<FormState> {
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

  const { email, password, uid, displayName: googleDisplayName, photoURL, isGoogleSignIn } = validatedFields.data;

  try {
    const auth = getAuth(adminAppInstance);

    // Handle Google Sign-in user creation/update
    if (isGoogleSignIn === 'true' && uid && email) {
        const userRef = adminDb.collection("users").doc(uid);
        const userSnap = await userRef.get();
        if (!userSnap.exists()) {
             await auth.setCustomUserClaims(uid, { role: 'user' });
             await userRef.set({
                email,
                displayName: googleDisplayName,
                photoURL: photoURL,
                role: 'user',
                createdAt: new Date().toISOString(),
             }, { merge: true });
        }
        return { success: true, message: "Google 로그인 사용자 정보가 확인되었습니다." };
    }


    if (!password) {
        return { success: false, message: "비밀번호를 입력해주세요." };
    }
    
    const displayName = email.split('@')[0];

    const userRecord = await auth.createUser({
        email,
        password,
        displayName,
    });
    
    // Set custom claim for user role
    await auth.setCustomUserClaims(userRecord.uid, { role: 'user' });
    
    if (adminDb) {
      const userData: { [key: string]: any } = {
        email,
        displayName,
        role: 'user',
        createdAt: new Date().toISOString(),
      };

      await adminDb.collection("users").doc(userRecord.uid).set(userData);
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
