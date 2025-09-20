// src/lib/services.ts
import { adminDb, adminAuth } from "./firebaseAdmin";
import { doc, setDoc } from "firebase/firestore";

/* This file is intended for SERVER-SIDE use for privileged operations. */

// Server: set custom claim
export async function setAdminClaimByEmail(email: string) {
  if (!adminAuth) throw new Error("[SERVICE_ADMIN_AUTH_MISSING] Admin Auth not initialized.");
  
  try {
    const user = await adminAuth.getUserByEmail(email);
    if (!user) throw new Error(`[SERVICE_USER_NOT_FOUND] User with email ${email} not found.`);
    
    await adminAuth.setCustomUserClaims(user.uid, { role: "admin" });
    
    // optional: write to users collection to keep data in sync
    if (adminDb) {
      await adminDb.collection("users").doc(user.uid).set({ role: "admin" }, { merge: true });
    }
    console.log(`[SERVICE_ADMIN_CLAIM_SUCCESS] Successfully set admin claim for ${user.email} (UID: ${user.uid})`);
    return { uid: user.uid, email: user.email };
  } catch (error: any) {
    console.error(`[SERVICE_ADMIN_CLAIM_FAIL] Failed to set admin claim for email: ${email}`, error);
    throw new Error(error.message);
  }
}

// Server: list users (admin only endpoint will call)
export async function listAllUsers(limit = 1000) {
  if (!adminAuth) throw new Error('[SERVICE_ADMIN_AUTH_MISSING] Admin Auth not initialized.');
  try {
    const res = await adminAuth.listUsers(limit);
    return res.users.map(u => ({
        uid: u.uid,
        email: u.email,
        displayName: u.displayName,
        customClaims: u.customClaims,
        photoURL: u.photoURL,
    }));
  } catch (error: any) {
    console.error('[SERVICE_LIST_USERS_FAIL] Failed to list users:', error);
    throw new Error('Failed to retrieve user list.');
  }
}
