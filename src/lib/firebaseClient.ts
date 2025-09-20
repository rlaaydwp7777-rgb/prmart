// src/lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (!clientConfig.apiKey || !clientConfig.projectId) {
  // In production builds, this will throw an error to fail the build.
  // In development, it will warn in the console.
  if (process.env.NODE_ENV === "production") {
    throw new Error("Missing NEXT_PUBLIC_FIREBASE_* env vars for production build.");
  } else {
    console.warn("Firebase client env missing; auth/firestore will be disabled in dev.");
  }
}

// Initialize Firebase client app (if not already initialized)
export const firebaseClientApp = getApps().length === 0 ? initializeApp(clientConfig) : getApps()[0];

// Get Auth and Firestore instances only on the client-side
export const firebaseAuth = (typeof window !== "undefined") ? getAuth(firebaseClientApp) : null;
export const firebaseDb = (typeof window !== "undefined") ? getFirestore(firebaseClientApp) : null;
