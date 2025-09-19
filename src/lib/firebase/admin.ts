
import { initializeApp, getApps, App } from 'firebase-admin/app';
import { credential } from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';

// IMPORTANT: In a real production environment, use environment variables
// and secret management instead of hardcoding service account keys.
// For this example, we assume the service account key is available.
const serviceAccount = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT ? JSON.parse(process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT) : null;

let app: App;

if (serviceAccount && !getApps().length) {
    try {
        app = initializeApp({
            credential: credential.cert(serviceAccount)
        });
        console.log("Firebase Admin SDK initialized successfully.");
    } catch (e) {
        console.error("Firebase Admin SDK initialization error:", e);
    }
} else if (getApps().length) {
    app = getApps()[0];
} else {
    console.warn("Firebase Admin SDK could not be initialized. Service account key is missing or invalid. Ensure FIREBASE_ADMIN_SERVICE_ACCOUNT is set in your environment.");
}


export { app };
