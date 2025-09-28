// src/components/auth/AuthProvider.tsx
"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { getSafeAuth, onAuthStateChanged, signOut, type User } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

type AuthContextType = { user: User | null; loading: boolean; signOut: () => Promise<void> };
const AuthContext = createContext<AuthContextType>({ user: null, loading: true, signOut: async () => {} });

// Helper to set cookie
async function setAuthCookie(user: User | null) {
    try {
        if (user) {
            const token = await user.getIdToken(true); // Force refresh to get the latest token
            const expires = new Date(Date.now() + 23 * 60 * 60 * 1000).toUTCString();
            const secure = process.env.NODE_ENV === "production" ? "Secure;" : "";
            document.cookie = `firebaseIdToken=${token}; path=/; expires=${expires}; SameSite=Lax; ${secure}`;
        } else {
            // Clear cookie on logout
            document.cookie = `firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax;`;
        }
    } catch (error) {
        console.error("[AUTH_COOKIE_SET_FAIL] Failed to set auth cookie:", error);
    }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getSafeAuth();
    if (!auth) {
      console.warn("[AUTH_PROVIDER] Firebase auth not available on client. Auth features disabled.");
      setLoading(false);
      return;
    }
    
    // Listen for auth state changes
    const unsub = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      await setAuthCookie(u); // Set or clear cookie on every auth state change
      setLoading(false);
    });

    // Periodically refresh the token to get latest custom claims (e.g., role updates)
    const interval = setInterval(async () => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            await setAuthCookie(currentUser);
        }
    }, 20 * 60 * 1000); // 20 minutes

    return () => {
        unsub();
        clearInterval(interval);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut();
      // The onAuthStateChanged listener will clear the user and cookie.
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

  return <AuthContext.Provider value={{ user, loading, signOut: handleSignOut }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);