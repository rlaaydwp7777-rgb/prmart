// src/lib/firebaseClient.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let firebaseClientApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseDb: Firestore | null = null;

if (clientConfig.apiKey && clientConfig.projectId) {
  if (!getApps().length) {
    try {
      firebaseClientApp = initializeApp(clientConfig);
    } catch (e: any) {
      console.error("[CLIENT_INIT_ERROR] Firebase client initialization failed.", e);
      firebaseClientApp = null;
    }
  } else {
    firebaseClientApp = getApp();
  }
  
  if (firebaseClientApp) {
    firebaseAuth = getAuth(firebaseClientApp);
    firebaseDb = getFirestore(firebaseClientApp);
  }
} else {
  const errorMessage = "[CLIENT_ENV_MISSING] Firebase client environment variables are missing. Please check your .env file for NEXT_PUBLIC_FIREBASE_* variables.";
  if (process.env.NODE_ENV === "production") {
    throw new Error(errorMessage + " This will fail the production build.");
  } else {
    console.warn(errorMessage + " Auth/Firestore features will be disabled in development.");
  }
}

export { firebaseClientApp, firebaseAuth, firebaseDb };
