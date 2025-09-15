

"use client";

import * as React from "react";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getCategories, getIdeaRequests } from "@/lib/firebase/services";
import { RequestFilters } from "@/components/requests/request-filters";
import { useAuth } from "@/components/auth/auth-provider";
import type { Category, IdeaRequest } from "@/lib/types";
import { createIdeaRequestAction } from "../actions";
import type { FormState } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

interface RequestsPageProps {
  categories: Category[];
  initialRequests: IdeaRequest[];
}

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

function RequestForm({ categories }: { categories: Category[] }) {
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
      <div className="text-center text-muted-foreground p-8 border rounded-lg bg-muted/50">
        아이디어를 요청하려면 먼저 로그인해주세요.
      </div>
    );
  }

  return (
    <form ref={formRef} action={formAction} className="max-w-2xl mx-auto space-y-6 border p-6 sm:p-8 rounded-lg">
      <input type="hidden" name="author" value={user.displayName || user.email || "익명"} />
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
    </form>
  )
}

export default function RequestsPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [ideaRequests, setIdeaRequests] = React.useState<IdeaRequest[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.all([
      getCategories(),
      getIdeaRequests()
    ]).then(([cats, reqs]) => {
      setCategories(cats);
      setIdeaRequests(reqs);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
          아이디어 요청하기
        </h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl">
          찾고 있는 아이디어가 없나요? 필요한 프롬프트, 템플릿, 노하우를 요청하면 prmart의 전문가들이 만들어 드립니다.
        </p>
      </div>

      <RequestForm categories={categories} />

      <Separator className="my-12 md:my-16" />

      {loading ? (
        <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
        </div>
      ) : (
        <RequestFilters categories={categories} initialRequests={ideaRequests} />
      )}
    </div>
  );
}
