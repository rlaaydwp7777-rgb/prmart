// src/app/(auth)/login/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { getSafeAuth, signInWithGoogle, signInWithEmailAndPassword } from "@/lib/firebase/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { signUpAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Google 로그인 시 Firestore에 사용자 정보를 생성/업데이트하는 서버 액션 호출
async function createOrUpdateUser(user: any) {
    const formData = new FormData();
    formData.append('uid', user.uid);
    formData.append('email', user.email!);
    formData.append('displayName', user.displayName || '');
    formData.append('photoURL', user.photoURL || '');
    formData.append('isGoogleSignIn', 'true');
    await signUpAction({success: false, message: ''}, formData);
}

export default function LoginPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { toast } = useToast();
  const continueUrl = params?.get("continueUrl") || "/";
  const errorParam = params?.get("error");

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (errorParam === 'session-expired') {
      toast({
        title: "세션 만료",
        description: "안전한 서비스 이용을 위해 세션이 만료되었습니다. 다시 로그인해주세요.",
        variant: "destructive"
      });
    }
  }, [errorParam, toast]);

  const handleAuthError = (error: any) => {
    switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
             setErr("이메일 또는 비밀번호가 올바르지 않습니다.");
             break;
        case 'auth/too-many-requests':
             setErr("너무 많은 로그인 시도를 했습니다. 잠시 후 다시 시도해주세요.");
             break;
        default:
            setErr("로그인 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
            console.error("Login error:", error);
            break;
    }
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null); // Clear previous errors
    const auth = getSafeAuth();
    if (!auth) {
        setErr("인증 서비스를 사용할 수 없습니다. 환경변수를 확인해주세요. [CLIENT_INIT_FAIL]");
        return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      toast({ title: "로그인 성공", description: "prmart에 오신 것을 환영합니다." });
      router.push(continueUrl);
    } catch (error: any) {
      handleAuthError(error);
    }
  };

  const onGoogle = async () => {
    try {
      const result = await signInWithGoogle();
      // Google 로그인 사용자를 DB에 등록/업데이트
      await createOrUpdateUser(result.user);
      toast({ title: "로그인 성공", description: "prmart에 오신 것을 환영합니다." });
      router.push(continueUrl);
    } catch (error: any) {
      handleAuthError(error);
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
        {errorParam === 'session-expired' && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>세션 만료</AlertTitle>
            <AlertDescription>
              안전을 위해 다시 로그인해주세요.
            </AlertDescription>
          </Alert>
        )}
        <Button variant="outline" className="w-full" onClick={onGoogle}>
          Google 계정으로 로그인
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">또는 이메일로 계속하기</span>
          </div>
        </div>
        <form onSubmit={onSubmit} className="grid gap-2">
          <Input required value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="email@example.com" />
          <Input required value={pw} onChange={e => setPw(e.target.value)} type="password" placeholder="비밀번호" />
           {err && <p className="text-sm text-center text-destructive">{err}</p>}
          <Button type="submit" className="w-full mt-2">로그인</Button>
        </form>
      </CardContent>
    </Card>
  );
}