"use client";

import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AUTH_STRINGS } from "@/lib/string-constants";
import { SignupForm } from "@/components/auth/signup-form";
import Image from "next/image";

export default function SignupPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-muted/50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
            <div className="w-full flex justify-center mb-4">
                 <Image src="/logo-dark.svg" alt="prmart logo" width={120} height={40} />
            </div>
            <CardTitle>{AUTH_STRINGS.SIGNUP_TITLE}</CardTitle>
            <CardDescription>{AUTH_STRINGS.SIGNUP_DESCRIPTION}</CardDescription>
        </CardHeader>
        <CardContent>
            <SignupForm />
            <div className="mt-4 text-center text-sm">
              {AUTH_STRINGS.ALREADY_HAVE_ACCOUNT}{" "}
              <Link href="/login" className="underline">
                {AUTH_STRINGS.LOGIN}
              </Link>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
