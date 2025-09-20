import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

function validateConfig(config: typeof firebaseConfig): boolean {
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

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (validateConfig(firebaseConfig)) {
  if (!getApps().length) {
    try {
      app = initializeApp(firebaseConfig);
    } catch (e) {
      console.error("Firebase client initialization error", e);
    }
  } else {
    app = getApp();
  }
  
  if (app) {
    db = getFirestore(app);
  }
}

export { app as firebaseApp, db };
