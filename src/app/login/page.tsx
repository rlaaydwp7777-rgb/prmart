
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AUTH_STRINGS, BUTTONS } from "@/lib/string-constants";
import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { Loader2, Sparkles, Send } from "lucide-react";
import { signInWithGoogleAction, signInWithEmailAction, resetPasswordAction, type AuthState } from "../actions";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { useAuth } from "@/components/auth/auth-provider";
import { useRouter } from "next/navigation";


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

function EmailSignInButton() {
     const { pending } = useFormStatus();
     return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {AUTH_STRINGS.LOGIN}
        </Button>
     )
}

function ResetPasswordDialog({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void}) {
  const [state, formAction] = useActionState(resetPasswordAction, { success: false, message: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (state.success && state.message) {
      toast({
        title: "성공",
        description: state.message,
      });
      onOpenChange(false);
      formRef.current?.reset();
    }
  }, [state, toast, onOpenChange]);

  const SubmitButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button type="submit" disabled={pending}>
        {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
        재설정 링크 받기
      </Button>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>비밀번호 재설정</DialogTitle>
          <DialogDescription>
            가입했던 이메일 주소를 입력하세요. 비밀번호를 재설정할 수 있는 링크를 보내드립니다.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="reset-email" className="sr-only">
              이메일
            </Label>
            <Input
              id="reset-email"
              name="email"
              placeholder="name@example.com"
              required
              type="email"
            />
             {state?.errorType === 'email' && <p className="text-sm text-destructive">{state.error}</p>}
             {state?.errorType === 'general' && <p className="text-sm text-destructive">{state.error}</p>}
          </div>
          <DialogFooter>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


export default function LoginPage() {
    const [googleState, googleAction] = useActionState(signInWithGoogleAction, { success: false, message: "" });
    const [emailState, emailAction] = useActionState(signInWithEmailAction, { success: false, message: "" });
    const { toast } = useToast();
    const router = useRouter();
    const { user, loading } = useAuth();
    const [resetDialogOpen, setResetDialogOpen] = useState(false);

    useEffect(() => {
        if(googleState.success) {
            toast({ title: "성공", description: googleState.message });
            router.push("/");
        } else if (googleState.error && googleState.errorType === 'general') {
            toast({ title: "오류", description: googleState.error, variant: "destructive" });
        }
    }, [googleState, toast, router]);

    useEffect(() => {
        if(emailState.success) {
            toast({ title: "성공", description: emailState.message });
            router.push("/");
        } else if (emailState.error && emailState.errorType === 'general') {
            toast({ title: "오류", description: emailState.error, variant: "destructive" });
        }
    }, [emailState, toast, router]);

    useEffect(() => {
        if (!loading && user) {
            router.replace("/");
        }
    }, [user, loading, router]);


    if(loading || user) {
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
                 {emailState?.errorType === 'email' && <p className="text-sm text-destructive">{emailState.error}</p>}
                </div>
                <div className="space-y-2">
                    <div className="flex items-center justify-between">
                        <Label htmlFor="password">{AUTH_STRINGS.PASSWORD_LABEL}</Label>
                        <Button type="button" variant="link" className="text-sm h-auto p-0" onClick={() => setResetDialogOpen(true)}>
                            {AUTH_STRINGS.FORGOT_PASSWORD}
                        </Button>
                    </div>
                    <Input id="password" type="password" name="password" placeholder="••••••••" required />
                     {emailState?.errorType === 'password' && <p className="text-sm text-destructive">{emailState.error}</p>}
                </div>
                {emailState?.errorType === 'general' && <p className="text-sm text-destructive mt-2">{emailState.error}</p>}
                <EmailSignInButton />
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
      <ResetPasswordDialog open={resetDialogOpen} onOpenChange={setResetDialogOpen} />
    </div>
  );
}
