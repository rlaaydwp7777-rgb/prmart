// src/lib/firebaseAdmin.ts
import admin from "firebase-admin";

let adminApp: admin.app.App | null = null;

function initAdmin() {
  if (admin.apps.length > 0) {
    adminApp = admin.app();
    return adminApp;
  }

  const hasServiceAccount = process.env.FIREBASE_ADMIN_PRIVATE_KEY && process.env.FIREBASE_ADMIN_CLIENT_EMAIL && process.env.FIREBASE_ADMIN_PROJECT_ID;

  if (hasServiceAccount) {
    try {
        admin.initializeApp({
            credential: admin.credential.cert({
                projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
                privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
            }),
        });
        adminApp = admin.app();
        return adminApp;
    } catch (e: any) {
       console.error("[ADMIN_INIT_ERROR] Firebase Admin SDK initialization failed:", e.message);
       if (process.env.NODE_ENV === "production") {
         throw new Error(`[ADMIN_INIT_ERROR] Firebase Admin SDK failed to initialize in production. Reason: ${e.message}`);
       }
       return null;
    }
  }

  // Check for legacy JSON config for backward compatibility, but prefer individual vars
  const json = process.env.FIREBASE_ADMIN_SDK_JSON;
  if (json) {
     try {
        const formattedJson = json.replace(/\\n/g, '\n');
        const parsed = JSON.parse(formattedJson);
        admin.initializeApp({ credential: admin.credential.cert(parsed) });
        adminApp = admin.app();
        return adminApp;
     } catch (e: any) {
        console.error("[ADMIN_INIT_ERROR] Failed to parse FIREBASE_ADMIN_SDK_JSON. Please use individual FIREBASE_ADMIN_* variables. Details:", e.message);
        return null;
     }
  }

  const errorMessage = "[ADMIN_CONFIG_MISSING] Firebase Admin SDK not configured. Set FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_PRIVATE_KEY, and FIREBASE_ADMIN_CLIENT_EMAIL in your environment variables.";
  
  // In a production environment, this should be a fatal error.
  if (process.env.NODE_ENV === "production" && !admin.apps.length) {
    throw new Error(errorMessage);
  }

  // In development, we can warn but allow the app to run.
  if (typeof window === "undefined") {
      console.warn(errorMessage + " Admin-only features will be disabled.");
  }
  
  return null;
}

export const adminAppInstance = initAdmin();
export const adminAuth = adminAppInstance ? adminAppInstance.auth() : null;
export const adminDb = adminAppInstance ? adminAppInstance.firestore() : null;
