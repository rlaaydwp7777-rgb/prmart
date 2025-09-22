
"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Loader2 } from "lucide-react";
import Link from "next/link";
import { createProposalAction } from "@/app/actions";
import type { FormState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { LogIn } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

interface ProposalFormProps {
    requestId: string;
}

const initialState: FormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
      제안 제출
    </Button>
  );
}

export function ProposalForm({ requestId }: ProposalFormProps) {
  const [state, formAction] = useActionState(createProposalAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "성공" : "오류",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
    }
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state, toast]);

  if (!user) {
    return (
        <Alert>
            <LogIn className="h-4 w-4" />
            <AlertTitle>로그인이 필요합니다</AlertTitle>
            <AlertDescription>
                아이디어를 제안하려면 먼저 <Link href="/login" className="font-bold underline hover:text-primary">로그인</Link>해주세요.
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-headline">아이디어 제안하기</h2>
      <div className="flex gap-4 items-start">
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.photoURL || ""} alt={user.displayName || "user"} data-ai-hint="person face" />
          <AvatarFallback>{user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}</AvatarFallback>
        </Avatar>
        <form ref={formRef} action={formAction} className="flex-1 space-y-2">
            <input type="hidden" name="requestId" value={requestId} />
            <Textarea
                name="content"
                placeholder="여기에 제안 내용이나 댓글을 입력하세요... 자신의 상품을 링크할 수도 있습니다."
                className="min-h-[100px]"
                required
            />
            <div className="flex justify-between items-center">
                <SubmitButton />
                <p className="text-sm text-muted-foreground">상품을 첨부하려면 URL을 붙여넣으세요.</p>
            </div>
             {state?.issues && (
                <div className="text-sm text-destructive">
                    {state.issues.map((issue, i) => <p key={i}>{issue}</p>)}
                </div>
            )}
             {!state.success && state.message && !state.issues && (
                <p className="text-sm text-center text-destructive">{state.message}</p>
             )}
        </form>
      </div>
    </div>
  );
}
