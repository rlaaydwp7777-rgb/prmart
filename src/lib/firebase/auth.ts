import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  type User,
  type UserCredential,
  type Auth
} from "firebase/auth";
import { auth as firebaseAuth } from "@/lib/firebase";

/**
 * Gets the Firebase Auth instance safely.
 * This function is designed to be called on the client side.
 * It returns the initialized Auth instance or a dummy object if not initialized.
 */
export const auth = (): Auth => {
  return firebaseAuth || {} as Auth;
};

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async (): Promise<UserCredential> => {
  const safeAuth = auth();
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

export const signOut = async (): Promise<void> => {
   const safeAuth = auth();
   if (!safeAuth.app) {
    console.warn("Firebase is not initialized. Sign out operation skipped.");
    return;
  }
  try {
    await firebaseSignOut(safeAuth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Re-export other functions
export {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
}
