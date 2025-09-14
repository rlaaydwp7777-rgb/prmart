
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AUTH_STRINGS, BUTTONS } from "@/lib/string-constants";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Sparkles } from "lucide-react";
import { signInWithGoogleAction } from "../actions";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useAuth } from "@/components/auth/auth-provider";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { FirebaseError } from "firebase/app";

function GoogleSignInButton() {
    const { pending } = useFormStatus();
    return (
        <Button variant="outline" className="w-full" type="submit" disabled={pending}>
             {pending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
                <Image src="/google.svg" width={16} height={16} alt="Google" className="mr-2" />
            )}
            {BUTTONS.CONTINUE_WITH_GOOGLE}
        </Button>
    )
}

export default function LoginPage() {
    const [googleState, googleAction] = useActionState(signInWithGoogleAction, null);
    const { toast } = useToast();
    const { user, loading } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleEmailSignIn = async (formData: FormData) => {
        setIsSubmitting(true);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (!email || !password) {
            toast({ title: "오류", description: "이메일과 비밀번호를 입력해주세요.", variant: "destructive" });
            setIsSubmitting(false);
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            toast({ title: "성공", description: "로그인에 성공했습니다." });
            // AuthProvider will handle redirection
        } catch (error) {
             if (error instanceof FirebaseError) {
                const message = error.code === 'auth/invalid-credential' 
                    ? '이메일 또는 비밀번호를 잘못 입력했습니다.'
                    : '로그인에 실패했습니다. 다시 시도해주세요.';
                toast({ title: "로그인 실패", description: message, variant: "destructive" });
            } else {
                toast({ title: "오류", description: "알 수 없는 오류가 발생했습니다.", variant: "destructive" });
            }
        } finally {
            setIsSubmitting(false);
        }
    };


    useEffect(() => {
        if(googleState?.success) {
            toast({ title: "성공", description: googleState.message });
            // AuthProvider will handle redirection
        } else if (googleState?.error) {
            toast({ title: "오류", description: googleState.error, variant: "destructive" });
        }
    }, [googleState, toast]);

    if(loading || user) {
      // AuthProvider is checking for user or user exists, show loading or let AuthProvider redirect.
      return (
         <div className="w-full min-h-[calc(100vh-4rem)] flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }


  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col">
       <header className="py-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline tracking-tight">prmart</span>
        </Link>
       </header>
       <main className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">{AUTH_STRINGS.WELCOME_BACK}</CardTitle>
            <CardDescription>{AUTH_STRINGS.LOGIN_DESCRIPTION}</CardDescription>
            </CardHeader>
            <CardContent>
                <form action={googleAction} className="mb-4">
                    <GoogleSignInButton />
                </form>
            <div className="flex items-center gap-4 my-4">
                <Separator className="flex-1" />
                <span className="text-xs text-muted-foreground">OR</span>
                <Separator className="flex-1" />
            </div>
            <form ref={formRef} action={handleEmailSignIn} className="space-y-4">
                <div className="space-y-2">
                <Label htmlFor="email">{AUTH_STRINGS.EMAIL_LABEL}</Label>
                <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder={AUTH_STRINGS.EMAIL_PLACEHOLDER}
                    required
                />
                </div>
                <div className="space-y-2">
                <Label htmlFor="password">{AUTH_STRINGS.PASSWORD_LABEL}</Label>
                <Input id="password" type="password" name="password" placeholder="••••••••" required />
                </div>
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {AUTH_STRINGS.LOGIN}
                </Button>
            </form>
            </CardContent>
            <CardFooter className="justify-center text-sm">
            <p className="text-muted-foreground">
                계정이 없으신가요?{" "}
                <Link href="/signup" className="font-medium text-primary hover:underline">
                {AUTH_STRINGS.SIGNUP}
                </Link>
            </p>
            </CardFooter>
        </Card>
      </main>
    </div>
  );
}

    