// src/lib/firebase/client.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

const clientConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

let app: FirebaseApp;

// Lazy initialization for the Firebase app
export function getFirebaseApp(): FirebaseApp {
  if (getApps().length) {
    return getApp();
  }

  const areAllKeysPresent =
    clientConfig.apiKey &&
    clientConfig.authDomain &&
    clientConfig.projectId &&
    clientConfig.storageBucket &&
    clientConfig.messagingSenderId &&
    clientConfig.appId;

  if (!areAllKeysPresent) {
    const missingKeys = Object.entries(clientConfig)
      .filter(([key, value]) => !value && key !== 'measurementId')
      .map(([key]) => `NEXT_PUBLIC_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`);
    
    const message = `[CLIENT_INIT_FAIL] Firebase client config is missing required keys: ${missingKeys.join(", ")}. Please check your .env file.`;
    
    if (typeof window !== "undefined") {
      console.warn(message);
    }
    // Return a dummy object or throw an error, but for now we let it fail on initializeApp
  }

  app = initializeApp(clientConfig);
  return app;
}
