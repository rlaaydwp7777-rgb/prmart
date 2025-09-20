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

function getSafeAuth(): Auth {
    if (authInstance) {
        return authInstance;
    }
    
    try {
        const app = getFirebaseApp();
        authInstance = getAuth(app);
        return authInstance;
    } catch (e: any) {
        console.error("[AUTH_INIT_FAIL] Could not initialize Firebase Auth:", e.message);
        // Return a mock object to prevent app from crashing
        return {} as Auth;
    }
}

const googleProvider = new GoogleAuthProvider();

async function signInWithGoogle(): Promise<UserCredential> {
  const auth = getSafeAuth();
  if (!auth.app) {
    throw new Error("Authentication service is not available.");
  }
  return signInWithPopup(auth, googleProvider);
}

async function signOut(): Promise<void> {
  const auth = getSafeAuth();
  if (!auth.app) {
    console.warn("Authentication service is not available. Sign out skipped.");
    return;
  }
  return firebaseSignOut(auth);
}

export { 
    getSafeAuth,
    onAuthStateChanged,
    signInWithGoogle,
    signOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    type User,
    type UserCredential,
    type Auth,
};
