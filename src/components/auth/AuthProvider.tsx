// src/components/auth/AuthProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getSafeAuth, onAuthStateChanged, safeSignOut, type User } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type AuthContextType = { user: User | null; loading: boolean; signOut: () => Promise<void> };
const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOut: async () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getSafeAuth();
    if (!auth) {
      console.warn("[AUTH_PROVIDER] Auth not available (likely missing env or SSR).");
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      setLoading(false);

      // 쿠키 설정 (미들웨어 검증용)
      try {
        if (u) {
          const token = await u.getIdToken(true);
          const expires = new Date(Date.now() + 1000 * 60 * 60 * 24).toUTCString(); // 24h
          const secure = process.env.NODE_ENV === "production" ? " Secure;" : "";
          document.cookie = `firebaseIdToken=${token}; Path=/; Expires=${expires}; SameSite=Lax;${secure}`;
        } else {
          document.cookie = "firebaseIdToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;";
        }
      } catch (e) {
        console.error("[AUTH_TOKEN_COOKIE_FAIL]", e);
      }
    });

    return () => unsub();
  }, []);

  const signOut = async () => {
    try {
      await safeSignOut();
      router.push("/");
    } catch (e) {
      console.error("[SIGN_OUT_FAIL]", e);
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
