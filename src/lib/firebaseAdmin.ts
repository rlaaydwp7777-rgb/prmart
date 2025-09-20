// src/lib/firebaseAdmin.ts
import admin from "firebase-admin";

let adminApp: admin.app.App | null = null;

function initAdmin() {
  if (admin.apps && admin.apps.length > 0) {
    adminApp = admin.apps[0];
    return adminApp;
  }

  const json = process.env.FIREBASE_ADMIN_SDK_JSON;
  const hasServiceAccount = process.env.GOOGLE_APPLICATION_CREDENTIALS || json;

  if (hasServiceAccount) {
    try {
      if (json) {
        // Replace escaped newlines if they exist
        const formattedJson = json.replace(/\\n/g, '\n');
        const parsed = JSON.parse(formattedJson);
        admin.initializeApp({
          credential: admin.credential.cert(parsed),
        });
      } else {
        admin.initializeApp();
      }
      adminApp = admin.app();
      return adminApp;
    } catch (e: any) {
       console.error("[ADMIN_INIT_ERROR] Firebase Admin SDK initialization failed:", e.message);
       if (process.env.NODE_ENV === "production") {
         throw new Error("[ADMIN_INIT_ERROR] Firebase Admin SDK failed to initialize in production.");
       }
       return null;
    }
  }

  const errorMessage = "[ADMIN_CONFIG_MISSING] Firebase Admin SDK not configured. Set GOOGLE_APPLICATION_CREDENTIALS or FIREBASE_ADMIN_SDK_JSON.";
  if (process.env.NODE_ENV === "production") {
    throw new Error(errorMessage);
  }

  console.warn(errorMessage + " Admin-only APIs will be disabled in development.");
  return null;
}

export const adminAppInstance = initAdmin();
export const adminAuth = adminAppInstance ? adminAppInstance.auth() : null;
export const adminDb = adminAppInstance ? adminAppInstance.firestore() : null;
