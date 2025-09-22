
"use client";

import * as React from "react";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category } from "@/lib/types";
import { createIdeaRequestAction } from "@/app/actions";
import type { FormState } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn } from "lucide-react";
import { useAuth } from "../auth/AuthProvider";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import Link from "next/link";

const initialState: FormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
     <Button size="lg" className="w-full" type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      아이디어 등록하기
    </Button>
  )
}

export function RequestForm({ categories }: { categories: Category[] }) {
  const { user } = useAuth();
  const [state, formAction] = useActionState(createIdeaRequestAction, initialState);
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

  if (!user) {
    return (
        <Alert className="max-w-2xl mx-auto">
            <LogIn className="h-4 w-4" />
            <AlertTitle>로그인이 필요합니다</AlertTitle>
            <AlertDescription>
                아이디어를 요청하려면 먼저 <Link href="/login" className="font-bold underline hover:text-primary">로그인</Link>해주세요.
            </AlertDescription>
        </Alert>
    )
  }

  return (
    <form ref={formRef} action={formAction} className="max-w-2xl mx-auto space-y-6 border p-6 sm:p-8 rounded-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold font-headline tracking-tight">필요한 아이디어를 등록하세요</h2>
        <p className="text-muted-foreground mt-1">판매자들이 당신의 요청을 보고 상품을 제안할 거예요.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="request-title" className="font-medium">요청 제목</label>
          <Input id="request-title" name="title" placeholder="예: 인스타그램 릴스 제작용 템플릿" className="text-base h-11" required />
        </div>
        <div className="space-y-2">
          <label htmlFor="request-category" className="font-medium">카테고리</label>
          <Select name="category" required>
            <SelectTrigger id="request-category" className="text-base h-11">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="space-y-2">
        <label htmlFor="request-price" className="font-medium">희망 예산 (선택 사항)</label>
        <Input id="request-price" name="budget" type="number" placeholder="예: 20000" className="text-base h-11" />
      </div>
      <div className="space-y-2">
        <label htmlFor="request-description" className="font-medium">상세 설명</label>
        <Textarea id="request-description" name="description" placeholder="필요한 아이디어에 대해 자세히 설명해주세요." className="min-h-[120px] text-base" required />
      </div>
      <SubmitButton />
       {state?.issues && (
        <div className="text-sm text-destructive text-center">
          {state.issues.map((issue, i) => <p key={i}>{issue}</p>)}
        </div>
      )}
       {!state.success && state.message && !state.issues && (
            <p className="text-sm text-center text-destructive">{state.message}</p>
        )}
    </form>
  )
}
