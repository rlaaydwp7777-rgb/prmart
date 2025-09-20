"use client";

import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_STRINGS } from "@/lib/string-constants";
import { Loader2 } from "lucide-react";
import { signInWithEmailAction, type AuthState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Separator } from "../ui/separator";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {AUTH_STRINGS.LOGIN}
    </Button>
  );
}

const initialState: AuthState = {
  message: "",
  success: false,
  type: 'signin',
};

export function LoginForm() {
  const [state, formAction] = useActionState(signInWithEmailAction, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && state.type === 'signin') {
        toast({
            title: state.success ? "로그인 성공" : "로그인 오류",
            description: state.message,
            variant: state.success ? "default" : "destructive",
        });
    }
  }, [state, toast]);

  return (
    <div className="grid gap-6">
      <form action={formAction} className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">{AUTH_STRINGS.EMAIL_LABEL}</Label>
          <Input id="email" name="email" type="email" placeholder={AUTH_STRINGS.EMAIL_PLACEHOLDER} required />
        </div>
        <div className="grid gap-2">
           <div className="flex items-center">
              <Label htmlFor="password">{AUTH_STRINGS.PASSWORD_LABEL}</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                {AUTH_STRINGS.FORGOT_PASSWORD}
              </Link>
            </div>
          <Input id="password" name="password" type="password" placeholder={AUTH_STRINGS.PASSWORD_PLACEHOLDER} required />
        </div>
        {state?.issues && (
          <div className="text-sm text-destructive">
            {state.issues.map((issue) => (<p key={issue}>{issue}</p>))}
          </div>
        )}
        {state?.message && !state.success && (
             <p className="text-sm text-destructive text-center">{state.message}</p>
        )}
        <SubmitButton />
      </form>
       <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              또는
            </span>
          </div>
        </div>
      <Button variant="outline">
        {AUTH_STRINGS.CONTINUE_WITH_GOOGLE}
      </Button>
    </div>
  );
}
