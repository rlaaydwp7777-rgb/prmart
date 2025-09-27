// src/lib/firebase/auth.ts
import { 
    getAuth, 
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signOut as firebaseSignOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    type Auth,
    type User,
    type UserCredential
} from "firebase/auth";
import { getFirebaseApp } from "./client";

let authInstance: Auth | null = null;

// This function is safe to call on the server or client.
export function getSafeAuth(): Auth | null {
    if (authInstance) {
        return authInstance;
    }

    const app = getFirebaseApp();
    if (!app) {
        if (typeof window !== 'undefined') {
          // Only log error on the client
          console.warn("[AUTH_INIT_FAIL] Firebase App not available. Auth features will be disabled.");
        }
        return null;
    }
    
    try {
        authInstance = getAuth(app);
        return authInstance;
    } catch (e: any) {
        console.error("[AUTH_INIT_FAIL] Could not initialize Firebase Auth:", e.message);
        return null;
    }
}

const googleProvider = new GoogleAuthProvider();

async function signInWithGoogle(): Promise<UserCredential> {
  const auth = getSafeAuth();
  if (!auth) {
    throw new Error("Authentication service is not available. Please check your Firebase configuration.");
  }
  return signInWithPopup(auth, googleProvider);
}

async function signOut(): Promise<void> {
    const auth = getSafeAuth();
    if (!auth) {
        console.warn("Firebase not initialized. Sign out operation skipped.");
        return;
    }
    return firebaseSignOut(auth);
}

// Re-export original functions for use
export { 
    onAuthStateChanged,
    signInWithGoogle,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    type User,
    type UserCredential,
    type Auth,
};
