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
function getSafeAuth(): Auth {
    if (typeof window === 'undefined') {
        // On the server, return a mock object to prevent crashes.
        return { app: null } as unknown as Auth;
    }

    if (authInstance) {
        return authInstance;
    }
    
    try {
        const app = getFirebaseApp(); // This function is SSR-safe
        // If app initialization failed (e.g., missing config), getFirebaseApp will throw.
        if (app && app.options && app.options.apiKey) {
            authInstance = getAuth(app);
            return authInstance;
        }
        console.warn("[AUTH_INIT_WARN] Firebase app not fully initialized. Auth features may be disabled.");
        return {} as Auth;
    } catch (e: any) {
        // This will catch the error if getAuth fails for some reason
        console.error("[AUTH_INIT_FAIL] Could not initialize Firebase Auth:", e.message);
        // Return a mock object to prevent the app from crashing
        return {} as Auth;
    }
}

const googleProvider = new GoogleAuthProvider();

async function signInWithGoogle(): Promise<UserCredential> {
  const auth = getSafeAuth();
  if (!auth.app) {
    throw new Error("Authentication service is not available. Please check your Firebase configuration.");
  }
  return signInWithPopup(auth, googleProvider);
}

// Re-export original functions for use
export { 
    getSafeAuth,
    onAuthStateChanged,
    signInWithGoogle,
    firebaseSignOut,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    type User,
    type UserCredential,
    type Auth,
};
