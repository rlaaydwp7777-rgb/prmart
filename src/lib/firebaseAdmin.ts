import admin from "firebase-admin";

if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  
  if (!privateKey) {
    console.error("FIREBASE_ADMIN_PRIVATE_KEY is missing");
  } else {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        privateKey: privateKey.replace(/\\n/g, "\n"),
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      }),
    });
  }
}

export const adminAuth = admin.apps.length > 0 ? admin.auth() : null;
export const adminDb = admin.apps.length > 0 ? admin.firestore() : null;
