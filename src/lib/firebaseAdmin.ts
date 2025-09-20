// src/lib/firebaseAdmin.ts
import admin from "firebase-admin";

let adminApp: admin.app.App | null = null;

function initAdmin() {
  if (admin.apps && admin.apps.length > 0) {
    adminApp = admin.apps[0];
    return adminApp;
  }

  // Prefer GOOGLE_APPLICATION_CREDENTIALS, fallback to JSON in env var
  const json = process.env.FIREBASE_ADMIN_SDK_JSON;
  const hasServiceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS || json;

  if (hasServiceAccount) {
    try {
      if (json) {
        const parsed = JSON.parse(json);
        admin.initializeApp({
          credential: admin.credential.cert(parsed),
        });
      } else {
        admin.initializeApp();
      }
      adminApp = admin.app();
      return adminApp;
    } catch (e: any) {
       console.error("Firebase Admin SDK initialization error:", e.message);
       if (process.env.NODE_ENV === "production") {
         throw new Error("Firebase Admin SDK failed to initialize.");
       }
       return null;
    }
  }

  // Fail-fast in production if no config is found
  if (process.env.NODE_ENV === "production") {
    throw new Error("Firebase Admin SDK not configured. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_ADMIN_SDK_JSON.");
  }

  console.warn("Firebase Admin SDK not initialized (dev). Admin APIs will be disabled.");
  return null;
}

export const adminAppInstance = initAdmin();
export const adminAuth = adminAppInstance ? adminAppInstance.auth() : null;
export const adminDb = adminAppInstance ? adminAppInstance.firestore() : null;
