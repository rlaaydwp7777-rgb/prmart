"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, type User } from "@/lib/firebase/auth";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      toast({
        title: "로그인 성공",
        description: "prmart에 오신 것을 환영합니다!",
      });
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast({
        title: "로그인 실패",
        description: "Google 로그인 중 오류가 발생했습니다. 다시 시도해주세요.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
       toast({
        title: "로그아웃 성공",
        description: "성공적으로 로그아웃되었습니다.",
      });
    } catch (error) {
      console.error("Sign out error:", error);
       toast({
        title: "로그아웃 실패",
        description: "로그아웃 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const value = {
    user,
    loading,
    signInWithGoogle,
    signOut: handleSignOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
