// src/lib/firebase/auth.ts
import { getAuth, type Auth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, type User, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getFirebaseApp } from "./client";

// 호출부에서 auth?.app 체크로 분기 가능하도록 null 반환 허용
export function getSafeAuth(): Auth | null {
  const app = getFirebaseApp();
  if (!app) return null;
  try {
    return getAuth(app);
  } catch (e) {
    console.error("[AUTH_INIT_FAIL] Could not initialize Firebase Auth:", e);
    return null;
  }
}

// 헬퍼들
export async function signInWithGoogle() {
  const auth = getSafeAuth();
  if (!auth) throw new Error("Auth not available on client. [CLIENT_INIT_FAIL]");
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
}

export async function safeSignOut() {
  const auth = getSafeAuth();
  if (!auth) return;
  await signOut(auth);
}

export { onAuthStateChanged, type User, createUserWithEmailAndPassword, signInWithEmailAndPassword };
