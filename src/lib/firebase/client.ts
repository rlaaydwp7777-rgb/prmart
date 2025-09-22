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

function getFirebaseApp(): FirebaseApp {
  // This check prevents running initialization on the server.
  if (typeof window === "undefined") {
    return {} as FirebaseApp;
  }

  // If the app is already initialized, return it.
  if (getApps().length) {
    return getApp();
  }
  
  // Validate that all required keys are present.
  const requiredKeys: (keyof typeof clientConfig)[] = [
    'apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'
  ];
  
  const missingKeys = requiredKeys.filter(key => !clientConfig[key]);

  if (missingKeys.length > 0) {
    const errorKeyNames = missingKeys.map(key => `NEXT_PUBLIC_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`);
    const message = `[CLIENT_INIT_FAIL] Firebase client config is missing required keys: ${errorKeyNames.join(", ")}. Please check your .env file.`;
    
    // This will only throw on the client-side, making it obvious during runtime without breaking server builds.
    throw new Error(message);
  }

  // Initialize the Firebase app.
  return initializeApp(clientConfig);
}

// Export a memoized instance of the app.
const firebaseApp = getFirebaseApp();
export { firebaseApp };
