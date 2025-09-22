// src/components/auth/AuthProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getSafeAuth, onAuthStateChanged, signOut as firebaseSignOut, type User } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type AuthContextType = { user: User | null; loading: boolean; signOut: () => Promise<void> };
const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOut: async () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // getSafeAuth is safe to call on the client. It handles SSR checks internally.
    const auth = getSafeAuth();

    // If auth.app is falsy, it means we are on the server or client init failed.
    if (!auth.app) {
      console.warn("[AUTH_PROVIDER] Firebase auth not available on client. Auth features disabled.");
      setLoading(false);
      return;
    }
    
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);
      
      try {
        if (u) {
          // Set cookie for middleware server checks
          const token = await u.getIdToken(true); // Force refresh the token
          const expires = new Date(Date.now() + 23 * 60 * 60 * 1000).toUTCString(); // 23 hours
          const secure = process.env.NODE_ENV === "production" ? "Secure;" : "";
          document.cookie = `firebaseIdToken=${token}; path=/; expires=${expires}; SameSite=Lax; ${secure}`;
        } else {
          // Clear cookie on logout
          document.cookie = `firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        }
      } catch (error) {
          console.error("[AUTH_COOKIE_SET_FAIL] Failed to set auth cookie:", error);
          // Still proceed, but server-side protected routes might fail.
      }
    });
    return () => unsub();
  }, []);

  const signOut = async () => {
    try {
      await firebaseSignOut(getSafeAuth());
      // The onAuthStateChanged listener will clear the cookie.
      router.push("/");
    } catch(error) {
      console.error("[SIGN_OUT_FAIL] Sign out error:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="w-10 h-10 animate-spin text-primary" />
      </div>
    );
  }

  return <AuthContext.Provider value={{ user, loading, signOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
