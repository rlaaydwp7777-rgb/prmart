// src/app/(auth)/signup/page.tsx
"use client";
import React, { useState } from "react";
import { firebaseAuth } from "@/lib/firebaseClient";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { createOrUpdateUserDoc } from "@/lib/services";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

export default function SignUpPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!firebaseAuth) return setError("Auth service is not available.");
    try {
      const userCred = await createUserWithEmailAndPassword(firebaseAuth, email, pw);
      await updateProfile(userCred.user, { displayName: email.split("@")[0] });
      // Create user doc in Firestore
      await createOrUpdateUserDoc(userCred.user.uid, { 
        email, 
        displayName: email.split("@")[0],
        role: "user", 
        createdAt: new Date().toISOString() 
      });
      toast({ title: "회원가입 성공!", description: "prmart에 오신 것을 환영합니다." });
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Signup failed.");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">회원가입</CardTitle>
        <CardDescription>
          이미 계정이 있으신가요? <Link href="/login" className="underline">로그인</Link>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={onSubmit} className="grid gap-2">
          <Input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@example.com" />
          <Input required value={pw} onChange={e => setPw(e.target.value)} type="password" placeholder="비밀번호" />
          <Button type="submit" className="w-full mt-2">가입하기</Button>
          {error && <p className="text-sm text-center text-red-500">{error}</p>}
        </form>
      </CardContent>
    </Card>
  );
}
