
"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTH_STRINGS } from "@/lib/string-constants";
import { LoginForm } from "@/components/auth/login-form";
import { useAuth } from "@/components/auth/auth-provider";
import Image from 'next/image';

export default function LoginPage() {
  const { loading } = useAuth();

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
