import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  type Auth,
  type UserCredential,
} from "firebase/auth";
import { firebaseApp } from "@/lib/firebase";

let authInstance: Auth;

const getSafeAuth = (): Auth => {
  if (!firebaseApp) {
    // Return a dummy auth object to prevent app crash if Firebase is not initialized
    // This allows components to load without crashing, and AuthProvider will handle the UI.
    return { app: null } as unknown as Auth;
  }
  if (!authInstance) {
    authInstance = getAuth(firebaseApp);
  }
  return authInstance;
};

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<UserCredential> => {
  const safeAuth = getSafeAuth();
  if (!safeAuth.app) {
    throw new Error("Firebase is not initialized. Check your environment variables.");
  }
  try {
    const result = await signInWithPopup(safeAuth, googleProvider);
    return result;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export {
    getSafeAuth as auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    firebaseSignOut,
};
