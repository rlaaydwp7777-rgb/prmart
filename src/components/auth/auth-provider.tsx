
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
        // Set cookie to expire in 1 hour, matching Firebase session
        const expires = new Date(Date.now() + 60 * 60 * 1000).toUTCString();
        document.cookie = `firebaseIdToken=${token}; path=/; expires=${expires}; SameSite=Lax; Secure`;
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
  }, []);

  useEffect(() => {
    if(!safeAuth) {
        // If auth is not even initialized, we are not in a loading state.
        // This can happen if Firebase env vars are missing.
        if (loading) setLoading(false);
        return;
    };
    
    const unsubscribe = onAuthStateChanged(safeAuth, (user) => {
      setUser(user);
      setTokenCookie(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [safeAuth, loading]);

  useEffect(() => {
    if (loading) return;

    const isAuthPage = pathname === '/login' || pathname === '/signup';
    const continueUrl = searchParams.get('continueUrl');
    
    // If user is logged in, redirect from auth pages to where they were going or home
    if (user && isAuthPage) {
        router.replace(continueUrl || '/');
        return;
    }
    
    // If user is not logged in and tries to access a protected route
    if (!user && (pathname.startsWith('/seller'))) {
        const newContinueUrl = pathname + searchParams.toString();
        router.replace(`/login?continueUrl=${encodeURIComponent(newContinueUrl)}`);
        return;
    }

  }, [user, loading, pathname, router, searchParams]);

  const signOut = async () => {
    try {
      if (!safeAuth) {
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
