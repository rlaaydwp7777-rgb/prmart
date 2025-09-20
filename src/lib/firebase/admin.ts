import * as admin from 'firebase-admin';

// This is a simplified check for a typical JSON key structure
const hasAdminConfig = 
    process.env.FIREBASE_PROJECT_ID &&
    process.env.FIREBASE_CLIENT_EMAIL &&
    process.env.FIREBASE_PRIVATE_KEY;

if (!admin.apps.length && hasAdminConfig) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
      }),
    });
  } catch (error: any) {
    console.error('Firebase Admin SDK initialization error:', error.stack);
  }
} else if (!hasAdminConfig) {
    if(process.env.NODE_ENV !== 'production') {
        console.warn("Firebase Admin SDK config not found. Admin features will be disabled. Check FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY.");
    } else {
         throw new Error("Firebase Admin SDK config is missing. Cannot start server in production.");
    }
}

export { admin };
