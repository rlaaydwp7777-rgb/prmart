
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

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold font-headline">아이디어 제안하기</h2>
      <div className="flex gap-4 items-start">
        <Avatar className="h-10 w-10">
          <AvatarImage src={`https://avatar.vercel.sh/anonymous.png`} alt={"user"} data-ai-hint="person face" />
          <AvatarFallback>익</AvatarFallback>
        </Avatar>
        <form ref={formRef} action={formAction} className="flex-1 space-y-2">
            <input type="hidden" name="requestId" value={requestId} />
            <input type="hidden" name="authorId" value="anonymous_user" />

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
        </form>
      </div>
    </div>
  );
}
