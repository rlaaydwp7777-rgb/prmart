// src/components/auth/AuthProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseAuth } from "@/lib/firebaseClient";
import { onAuthStateChanged, signOut as firebaseSignOut, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type AuthContextType = { user: User | null; loading: boolean; signOut: () => Promise<void> };
const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOut: async () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!firebaseAuth) {
      console.warn("Firebase auth not available on client. Auth features disabled.");
      setLoading(false);
      return;
    }
    const unsub = onAuthStateChanged(firebaseAuth, async (u) => {
      setUser(u);
      if (u) {
        // Set cookie for middleware server checks
        const token = await u.getIdToken(true); // force refresh to get latest claims
        const expires = new Date(Date.now() + 60 * 60 * 24 * 1000).toUTCString(); // 24 hours
        document.cookie = `firebaseIdToken=${token}; path=/; expires=${expires}; SameSite=Lax; Secure`;
      } else {
        // Clear cookie on logout
        document.cookie = `firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const signOut = async () => {
    if (!firebaseAuth) return;
    try {
      await firebaseSignOut(firebaseAuth);
      router.push("/");
    } catch(error) {
      console.error("Sign out error:", error);
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
