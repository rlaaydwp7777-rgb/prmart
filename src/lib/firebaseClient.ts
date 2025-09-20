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
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function validateConfig(config: typeof clientConfig): boolean {
  // measurementId is optional and can be excluded from required keys
  const requiredKeys: (keyof typeof clientConfig)[] = ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'];
  const missingKeys = requiredKeys.filter(key => !config[key]);

  if (missingKeys.length > 0) {
    const message = `[CLIENT_INIT_FAIL] Firebase client config is missing required keys: ${missingKeys.join(", ")}. Please check your .env file.`;
    if (process.env.NODE_ENV === 'production') {
      throw new Error(message + " This will cause the build to fail in production.");
    } else {
      console.warn(message + " Firebase services will be disabled in development.");
    }
    return false;
  }
  return true;
}

let firebaseClientApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseDb: Firestore | null = null;

if (validateConfig(clientConfig)) {
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
}

export { firebaseClientApp, firebaseAuth, firebaseDb };
