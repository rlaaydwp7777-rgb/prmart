
import {
  getAuth,
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
import { app } from "@/lib/firebase";

let authInstance: Auth | null = null;
const isFirebaseInitialized = app && Object.keys(app).length > 0;

const getSafeAuth = () => {
  if (!isFirebaseInitialized) {
    // Return a dummy auth object to prevent app crash if Firebase is not initialized
    return {} as Auth;
  }
  if (!authInstance) {
    authInstance = getAuth(app);
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

export const signOut = async (): Promise<void> => {
   const safeAuth = getSafeAuth();
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

// Re-export other functions and the safe auth getter
export {
    getSafeAuth as auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
}

