// src/lib/firebase/client.ts
import { initializeApp, getApps, getApp, type FirebaseApp, FirebaseError } from "firebase/app";
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

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

// This function is safe to call on the server or client.
// It ensures Firebase is only initialized once and on the client-side.
function initializeClientApp(): FirebaseApp | null {
  if (typeof window === "undefined") {
    // On the server, don't initialize.
    return null;
  }

  if (app) {
    return app;
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
    
    console.error(`[CLIENT_INIT_FAIL] Firebase client config is missing required keys: ${missingKeys.join(", ")}. Please check your .env file.`);
    return null;
  }

  try {
     app = getApps().length ? getApp() : initializeApp(clientConfig);
     return app;
  } catch (e) {
    if (e instanceof FirebaseError) {
        console.error(`[CLIENT_INIT_FAIL] Firebase initialization failed with code: ${e.code}. Message: ${e.message}`);
    } else {
        console.error(`[CLIENT_INIT_FAIL] An unexpected error occurred during Firebase initialization:`, e);
    }
    return null;
  }
}

// Initialize the app on module load for client-side usage.
initializeClientApp();


// Public getter functions
export function getFirebaseApp(): FirebaseApp | null {
  return app;
}

export function getDb(): Firestore | null {
  if (app && !db) {
      db = getFirestore(app);
  }
  return db;
}
