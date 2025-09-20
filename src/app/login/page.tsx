"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTH_STRINGS } from "@/lib/string-constants";
import { LoginForm } from "@/components/auth/login-form";
import { signInWithGoogleAction } from "@/app/actions";
import { useAuth } from "@/components/auth/auth-provider";
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';

const initialState = { success: false, message: "", type: "general" as const };

export default function LoginPage() {
  const [googleState, googleAction] = useActionState(signInWithGoogleAction, initialState);
  const { loading } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (googleState.message && !googleState.success) {
      toast({
        title: "Google 로그인 오류",
        description: googleState.message,
        variant: "destructive",
      });
    }
  }, [googleState, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>인증 정보를 확인 중입니다...</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/50 p-4">
       <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="w-full flex justify-center mb-4">
                <Image src="/logo-dark.svg" alt="prmart logo" width={120} height={40} />
            </div>
            <CardTitle>{AUTH_STRINGS.WELCOME_BACK}</CardTitle>
            <CardDescription>{AUTH_STRINGS.LOGIN_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
            <LoginForm />
            <div className="mt-4 text-center text-sm">
            아직 계정이 없으신가요?{" "}
            <Link href="/signup" className="underline">
                회원가입
            </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
