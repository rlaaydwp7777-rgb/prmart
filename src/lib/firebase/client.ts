// src/lib/firebase/client.ts
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

type FirebaseClientConfig = {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId?: string | undefined;
};

// 호출 시점에만 env를 읽는다 (모듈 로드 시 X)
function getClientConfig(): FirebaseClientConfig {
  return {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  };
}

/**
 * 브라우저(클라이언트)에서만 Firebase App을 초기화/반환
 * SSR(서버)에서 호출되면 null 반환해 호출측에서 우회 가능
 */
export function getFirebaseApp(): FirebaseApp | null {
  if (typeof window === "undefined") {
    // SSR 가드: 서버에서는 초기화하지 않음
    return null;
  }

  const cfg = getClientConfig();
  const missing: string[] = [];
  if (!cfg.apiKey) missing.push("NEXT_PUBLIC_FIREBASE_API_KEY");
  if (!cfg.authDomain) missing.push("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN");
  if (!cfg.projectId) missing.push("NEXT_PUBLIC_FIREBASE_PROJECT_ID");
  if (!cfg.storageBucket) missing.push("NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET");
  if (!cfg.messagingSenderId) missing.push("NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID");
  if (!cfg.appId) missing.push("NEXT_PUBLIC_FIREBASE_APP_ID");

  if (missing.length) {
    console.error(
      `[CLIENT_INIT_FAIL] Firebase client config is missing required keys: ${missing.join(
        ", "
      )}. Check your .env / App Hosting variables.`
    );
    return null;
  }

  try {
    const app = getApps().length ? getApp() : initializeApp(cfg as any);
    return app;
  } catch (e) {
    console.error("[CLIENT_INIT_ERROR] initializeApp failed:", e);
    return null;
  }
}
