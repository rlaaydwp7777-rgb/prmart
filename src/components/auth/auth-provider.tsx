"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { signOutAction } from "@/app/actions";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
  isAdmin: false,
});

async function setTokenCookie(user: User | null) {
  if (user) {
    const token = await user.getIdToken();
    document.cookie = `firebaseIdToken=${token}; path=/; max-age=${60 * 60 * 24}; samesite=lax`;
  } else {
    document.cookie = 'firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const authInstance = auth();
    if (!authInstance.app) {
      console.warn("AuthProvider: Firebase not initialized. Skipping auth.");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(authInstance, async (user) => {
      setUser(user);
      await setTokenCookie(user);

      if (user) {
        const tokenResult = await user.getIdTokenResult();
        const userIsAdmin = tokenResult.claims.role === 'admin';
        setIsAdmin(userIsAdmin);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === '/login' || pathname === '/signup';
    
    if (user && isAuthPage) {
      const continueUrl = searchParams.get('continueUrl');
      router.replace(continueUrl || '/');
    }
    
    const isProtectedRoute = pathname.startsWith('/seller') || pathname.startsWith('/admin') || pathname.startsWith('/account');
    if (!user && isProtectedRoute) {
      const continueUrl = pathname + searchParams.toString();
      router.replace(`/login?continueUrl=${encodeURIComponent(continueUrl)}`);
    }
  }, [user, loading, pathname, router, searchParams]);

  const signOut = async () => {
    await signOutAction();
    setUser(null);
    setIsAdmin(false);
    await setTokenCookie(null);
    router.push('/');
  };

  const value = { user, loading, signOut, isAdmin };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
