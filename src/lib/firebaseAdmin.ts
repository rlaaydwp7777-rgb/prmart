import admin from 'firebase-admin';

// Admin SDK 초기화 (중복 방지)
if (!admin.apps.length) {
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  
  if (!privateKey) {
    console.error('FIREBASE_ADMIN_PRIVATE_KEY is missing');
    throw new Error('Firebase Admin SDK 초기화 실패: PRIVATE_KEY 누락');
  }

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
      privateKey: privateKey.replace(/\\n/g, '\n'), // 줄바꿈 처리
      clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
    }),
    databaseURL: `https://${process.env.FIREBASE_ADMIN_PROJECT_ID}.firebaseio.com`,
  });
}

export const adminAppInstance = admin.app();
export const adminDb = admin.firestore();
export const adminAuth = admin.auth();
