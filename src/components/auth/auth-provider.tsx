

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User, signOut as firebaseSignOut, type Auth } from "firebase/auth";
import { auth as getSafeAuth } from "@/lib/firebase/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  signOut: async () => {},
});

async function setTokenCookie(user: User | null) {
    if(user) {
        const token = await user.getIdToken();
        document.cookie = `firebaseIdToken=${token}; path=/;`;
    } else {
        document.cookie = 'firebaseIdToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    }
}


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [safeAuth, setSafeAuth] = useState<Auth | null>(null);

  useEffect(() => {
    // This now only runs on the client
    const authInstance = getSafeAuth();
    setSafeAuth(authInstance);

    if(!authInstance.app) {
      console.warn("Firebase not initialized in AuthProvider, auth features will be disabled.");
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(authInstance, (user) => {
      setUser(user);
      setTokenCookie(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === '/login' || pathname === '/signup';
    
    // If user is logged in, redirect from auth pages to where they were going or home
    if (user && isAuthPage) {
        const continueUrl = searchParams.get('continueUrl');
        router.replace(continueUrl || '/');
        return;
    }
    
    // If user is not logged in and tries to access a protected route
    if (!user && (pathname.startsWith('/seller'))) {
        const continueUrl = pathname;
        router.replace(`/login?continueUrl=${encodeURIComponent(continueUrl)}`);
        return;
    }

  }, [user, loading, pathname, router, searchParams]);

  const signOut = async () => {
    try {
      if (!safeAuth || !safeAuth.app) {
        console.warn("Firebase not initialized, signOut skipped.");
        return;
      }
      await firebaseSignOut(safeAuth);
      router.push('/');
    } catch (error) {
      console.error("Sign out error", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
