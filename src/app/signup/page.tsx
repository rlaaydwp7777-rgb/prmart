
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
import { AUTH_STRINGS, BUTTONS, FOOTER_STRINGS } from "@/lib/string-constants";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Sparkles } from "lucide-react";
import { signUpWithEmailAction, signInWithGoogleAction } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

function EmailSignUpButton() {
     const { pending } = useFormStatus();
     return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {AUTH_STRINGS.SIGNUP}
        </Button>
     )
}


export default function SignUpPage() {
    const [googleState, googleAction] = useActionState(signInWithGoogleAction, null);
    const [emailState, emailAction] = useActionState(signUpWithEmailAction, null);
    const { toast } = useToast();
    const router = useRouter();


    useEffect(() => {
        const state = emailState || googleState;
        if(state?.success) {
            toast({ title: "성공", description: state.message });
            router.push("/seller/dashboard");
        } else if (state?.error) {
            toast({ title: "오류", description: state.error, variant: "destructive" });
        }
    }, [emailState, googleState, toast, router])


  return (
     <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
       <div className="hidden bg-muted lg:flex flex-col items-center justify-center p-8 text-center">
        <div className="max-w-md">
            <Sparkles className="h-12 w-12 text-primary mx-auto" />
            <h1 className="mt-4 text-3xl font-bold font-headline">
                {AUTH_STRINGS.HERO_TITLE}
            </h1>
            <p className="mt-4 text-muted-foreground">
                {FOOTER_STRINGS.SLOGAN}
            </p>
        </div>
      </div>
      <div className="flex items-center justify-center py-12">
        <Card className="w-full max-w-sm mx-auto">
            <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">{AUTH_STRINGS.SIGNUP_TITLE}</CardTitle>
            <CardDescription>{AUTH_STRINGS.SIGNUP_DESCRIPTION}</CardDescription>
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
            <form action={emailAction} className="space-y-4">
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
                <div className="space-y-2">
                <Label htmlFor="confirm-password">{AUTH_STRINGS.CONFIRM_PASSWORD_LABEL}</Label>
                <Input id="confirm-password" type="password" name="confirmPassword" placeholder="••••••••" required />
                </div>
                <EmailSignUpButton />
            </form>
            </CardContent>
            <CardFooter className="justify-center text-sm">
            <p className="text-muted-foreground">
                {AUTH_STRINGS.ALREADY_HAVE_ACCOUNT}{" "}
                <Link href="/login" className="font-medium text-primary hover:underline">
                {AUTH_STRINGS.LOGIN}
                </Link>
            </p>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}

