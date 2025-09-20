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

let firebaseClientApp: FirebaseApp | null = null;
let firebaseAuth: Auth | null = null;
let firebaseDb: Firestore | null = null;

// 모든 필수 환경 변수가 있는지 확인
const areAllKeysPresent = 
  clientConfig.apiKey &&
  clientConfig.authDomain &&
  clientConfig.projectId &&
  clientConfig.storageBucket &&
  clientConfig.messagingSenderId &&
  clientConfig.appId;

if (areAllKeysPresent) {
  if (!getApps().length) {
    try {
      firebaseClientApp = initializeApp(clientConfig);
    } catch (e: any) {
      console.error("[CLIENT_INIT_ERROR] Firebase client initialization failed.", e);
      // 초기화 실패 시 모든 것을 null로 설정
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
  // 필수 키가 누락된 경우
  const missingKeys = Object.entries(clientConfig)
    .filter(([key, value]) => ['apiKey', 'authDomain', 'projectId', 'storageBucket', 'messagingSenderId', 'appId'].includes(key) && !value)
    .map(([key]) => `NEXT_PUBLIC_${key.replace(/([A-Z])/g, '_$1').toUpperCase()}`);

  const message = `[CLIENT_INIT_FAIL] Firebase client config is missing required keys: ${missingKeys.join(", ")}. Please check your .env file.`;
  if (process.env.NODE_ENV === 'production') {
    throw new Error(message + " This will cause the build to fail in production.");
  } else {
    console.warn(message + " Firebase services will be disabled in development.");
  }
}

export { firebaseClientApp, firebaseAuth, firebaseDb };
