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

function validateConfig(config: typeof clientConfig): boolean {
  // measurementId is optional
  const requiredKeys = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingKeys = requiredKeys.filter(key => !config[key as keyof typeof config]);

  if (missingKeys.length > 0) {
    const message = `Firebase client config is missing: ${missingKeys.join(", ")}.`;
    if (process.env.NODE_ENV === 'production') {
      throw new Error(message + " This will cause the build to fail in production.");
    } else {
      console.warn(message + " Firebase services will be disabled in development.");
    }
    return false;
  }
  return true;
}


let app: ReturnType<typeof initializeApp> | null = null;
if (validateConfig(clientConfig)) {
    app = getApps().length ? getApp() : initializeApp(clientConfig);
}

export const firebaseClientApp = app;
export const firebaseAuth = app ? getAuth(app) : null;
export const firebaseDb = app ? getFirestore(app) : null;
