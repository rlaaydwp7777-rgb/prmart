// src/app/(auth)/login/page.tsx
"use client";
import React, { useState } from "react";
import { firebaseAuth } from "@/lib/firebaseClient";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { createOrUpdateUserDoc } from "@/lib/services";

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const continueUrl = params?.get("continueUrl") || "/";
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseAuth) return setErr("인증 서비스를 사용할 수 없습니다. [CLIENT_INIT_FAIL]");
    try {
      await signInWithEmailAndPassword(firebaseAuth, email, pw);
      toast({ title: "로그인 성공", description: "prmart에 오신 것을 환영합니다." });
      router.push(continueUrl);
    } catch (error: any) {
      setErr(error.message || "Login failed");
    }
  };

  const onGoogle = async () => {
    if (!firebaseAuth) return setErr("인증 서비스를 사용할 수 없습니다. [CLIENT_INIT_FAIL]");
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(firebaseAuth, provider);
      const user = result.user;

      // Create user doc on first Google login
      await createOrUpdateUserDoc(user.uid, { 
        email: user.email, 
        displayName: user.displayName || user.email?.split("@")[0],
        photoURL: user.photoURL,
        role: "user", 
        createdAt: new Date().toISOString() 
      });

      toast({ title: "로그인 성공", description: "prmart에 오신 것을 환영합니다." });
      router.push(continueUrl);
    } catch (error: any) {
      setErr(error.message || "Google sign-in failed");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">로그인</CardTitle>
        <CardDescription>
          계정이 없으신가요? <Link href="/signup" className="underline">회원가입</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button variant="outline" className="w-full" onClick={onGoogle}>
          Google 계정으로 로그인
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              또는 이메일로 계속하기
            </span>
          </div>
        </div>
        <form onSubmit={onSubmit} className="grid gap-2">
          <Input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@example.com" />
          <Input required value={pw} onChange={e => setPw(e.target.value)} type="password" placeholder="비밀번호" />
          <Button type="submit" className="w-full mt-2">로그인</Button>
          {err && <p className="text-sm text-center text-red-500">{err}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
