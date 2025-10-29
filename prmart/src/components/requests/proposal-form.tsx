// src/components/requests/proposal-form.tsx
"use client";

import { useFormState, useFormStatus } from 'react-dom';
import { createProposalAction, FormState } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../auth/AuthProvider';
import Link from 'next/link';

const initialState: FormState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      제안 제출하기
    </Button>
  );
}

export function ProposalForm({ requestId }: { requestId: string }) {
  const { user } = useAuth();
  const [state, formAction] = useFormState(createProposalAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? '성공' : '오류',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        formRef.current?.reset();
      }
    }
  }, [state, toast]);

  if (!user) {
    return (
        <div className="p-6 border rounded-lg text-center bg-muted/50">
            <h3 className="font-semibold">제안을 제출하려면 로그인이 필요합니다.</h3>
            <Button asChild className="mt-4">
                <Link href="/login">로그인하기</Link>
            </Button>
        </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl font-bold font-headline mb-4">내 아이디어 제안하기</h2>
      <form ref={formRef} action={formAction} className="space-y-4">
        <input type="hidden" name="requestId" value={requestId} />
        <Textarea
          name="content"
          placeholder="이 요청에 맞는 내 상품을 링크와 함께 소개하거나, 새로운 아이디어를 제안해보세요."
          rows={5}
          required
        />
        <SubmitButton />
         {state?.issues && (
            <div className="text-sm text-destructive">
                {state.issues.map((issue) => (
                    <p key={issue}>- {issue}</p>
                ))}
            </div>
        )}
      </form>
    </div>
  );
}
