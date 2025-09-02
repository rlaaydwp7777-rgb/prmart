"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateDescriptionAction, registerProductAction } from "@/app/actions";
import type { FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Bot, CheckCircle, Loader2, Sparkles, Terminal, XCircle } from "lucide-react";

const productSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  description: z.string().min(20, "설명은 20자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  tags: z.string().min(1, "태그를 하나 이상 입력해주세요."),
  price: z.coerce.number().min(0, "가격은 0 이상의 숫자여야 합니다."),
});

type ProductFormData = z.infer<typeof productSchema>;

const initialState: FormState = {
  message: "",
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <CheckCircle className="mr-2 h-4 w-4" />}
      품질 검수 제출
    </Button>
  );
}

export function ProductRegistrationForm() {
  const [formState, formAction] = useFormState(registerProductAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: "",
      price: 0
    }
  });
  
  const titleValue = watch("title");

  useEffect(() => {
    if (formState.message) {
      if (formState.success) {
        toast({
          title: "성공!",
          description: formState.message,
        });
        if(formRef.current) formRef.current.reset();
      } else {
         toast({
          title: "제출 상태",
          description: formState.message,
          variant: "destructive",
        });
      }
    }
  }, [formState, toast]);

  const handleGenerateDescription = async () => {
    if (!titleValue || titleValue.trim().length < 5) {
      toast({
        title: "오류",
        description: "설명을 생성하려면 5자 이상의 유효한 제목을 입력해주세요.",
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    const result = await generateDescriptionAction(titleValue);
    setIsGenerating(false);
    if (result.description) {
      setValue("description", result.description, { shouldValidate: true });
      toast({
        title: "설명 생성 완료!",
        description: "AI가 상품 설명을 생성했습니다.",
      });
    } else {
      toast({
        title: "오류",
        description: result.error,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center gap-2">
          <Bot /> AI 판매 도우미
        </CardTitle>
        <CardDescription>새 상품을 등록하세요. AI가 단계별로 도와드립니다.</CardDescription>
      </CardHeader>
      <CardContent>
        <form ref={formRef} action={formAction} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">상품 제목</Label>
            <Input id="title" name="title" placeholder="예: 최고의 생산성 플래너 템플릿" {...register("title")} />
            {errors.title && <p className="text-sm text-destructive">{errors.title.message}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">상품 설명</Label>
              <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
                {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
                AI로 생성하기
              </Button>
            </div>
            <Textarea
              id="description"
              name="description"
              placeholder="상품, 기능, 그리고 대상 고객에 대해 설명해주세요."
              className="min-h-[120px]"
              {...register("description")}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select name="category" onValueChange={(value) => setValue('category', value, {shouldValidate: true})}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="카테고리 선택" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map(cat => (
                    <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
               {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">가격 (₩)</Label>
              <Input id="price" name="price" type="number" placeholder="예: 10000" {...register("price")} />
              {errors.price && <p className="text-sm text-destructive">{errors.price.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">태그</Label>
            <Input id="tags" name="tags" placeholder="예: 생산성, 노션, 템플릿" {...register("tags")} />
            <p className="text-xs text-muted-foreground">태그는 쉼표로 구분해주세요.</p>
            {errors.tags && <p className="text-sm text-destructive">{errors.tags.message}</p>}
          </div>

          <SubmitButton />
        </form>

        {formState.issues && formState.issues.length > 0 && (
          <Alert variant="destructive" className="mt-4">
            <Terminal className="h-4 w-4" />
            <AlertTitle>폼 오류</AlertTitle>
            <AlertDescription>
              <ul className="list-disc pl-5">
                {formState.issues.map((issue, index) => (
                  <li key={index}>{issue}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        )}

        {formState.qualityResult && (
          <Alert className="mt-4" variant={formState.qualityResult.isApproved ? "default" : "destructive"}>
             {formState.qualityResult.isApproved ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
            <AlertTitle>AI 품질 검수 결과</AlertTitle>
            <AlertDescription>
              <p><strong>점수:</strong> {(formState.qualityResult.qualityScore * 100).toFixed(0)}/100</p>
              <p><strong>상태:</strong> {formState.qualityResult.isApproved ? "승인됨" : "수동 검토 대기"}</p>
              <p><strong>사유:</strong> {formState.qualityResult.reason}</p>
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
