// src/lib/services.ts (server + client compatible minimal helpers)
import { firebaseDb } from "./firebaseClient";
import { adminDb, adminAuth } from "./firebaseAdmin";
import { doc, setDoc } from "firebase/firestore";

/* CLIENT: read-only helpers using firebaseDb; SERVER: adminDb for privileged ops */

// Create or update user doc in Firestore (called after signup)
// This should ideally be a server-side operation for security.
// For simplicity in this context, we allow client-side creation on signup.
export async function createOrUpdateUserDoc(uid: string, data: Record<string, any>) {
  if (!firebaseDb && !adminDb) {
    throw new Error("No Firestore instance available.");
  }
  const db = adminDb ? adminDb.collection("users").doc(uid) : doc(firebaseDb!, "users", uid);
  
  if(adminDb){
    await (db as admin.firestore.DocumentReference).set(data, { merge: true });
  } else {
     await setDoc(db, data, { merge: true });
  }
}

// Server: set custom claim
export async function setAdminClaimByEmail(email: string) {
  if (!adminAuth) throw new Error("Admin Auth not initialized.");
  const user = await adminAuth.getUserByEmail(email);
  if (!user) throw new Error(`User with email ${email} not found.`);
  
  await adminAuth.setCustomUserClaims(user.uid, { role: "admin" });
  // optional: write to users collection to keep data in sync
  if (adminDb) {
    await adminDb.collection("users").doc(user.uid).set({ role: "admin" }, { merge: true });
  }
  return { uid: user.uid, email: user.email };
}

// Server: list users (admin only endpoint will call)
export async function listAllUsers(limit = 1000) {
  if (!adminAuth) throw new Error("Admin Auth not initialized.");
  const res = await adminAuth.listUsers(limit);
  return res.users.map(u => ({
      uid: u.uid,
      email: u.email,
      displayName: u.displayName,
      customClaims: u.customClaims,
      photoURL: u.photoURL,
  }));
}
