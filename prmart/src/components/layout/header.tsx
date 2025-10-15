// src/components/auth/signup-form.tsx
"use client";
import React, { useEffect, useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signUpAction, type FormState } from "@/app/actions";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

const initialState: FormState = {
  message: "",
  success: false,
};

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full mt-2" disabled={pending}>
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            가입하기
        </Button>
    )
}

export function SignUpForm() {
  const [state, formAction] = useFormState(signUpAction, initialState);
  const { toast } = useToast();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  
  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "회원가입 성공" : "오류",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        formRef.current?.reset();
        // Redirect to login page after successful signup
        router.push('/login');
      }
    }
  }, [state, toast, router]);

  return (
    <form ref={formRef} action={formAction} className="grid gap-2">
      <Input name="email" required type="email" placeholder="email@example.com" />
      <Input name="password" required type="password" placeholder="비밀번호" />
      <SubmitButton />
      {state?.issues && (
        <div className="text-sm text-destructive">
          {state.issues.map((issue, i) => (
            <p key={i}>- {issue}</p>
          ))}
        </div>
      )}
       {!state.success && state.message && !state.issues && (
            <p className="text-sm text-center text-destructive">{state.message}</p>
        )}
    </form>
  );
}