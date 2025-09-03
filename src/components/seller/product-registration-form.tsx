
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
import { CheckCircle, Loader2, Sparkles, Terminal, XCircle } from "lucide-react";
import { BUTTONS, SELLER_DASHBOARD_STRINGS } from "@/lib/string-constants";
import { cn } from "@/lib/utils";

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
      {BUTTONS.SUBMIT_FOR_REVIEW}
    </Button>
  );
}

export function ProductRegistrationForm() {
  const [formState, formAction] = useFormState(registerProductAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ProductFormData>({
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
  const categoryValue = watch("category");

  useEffect(() => {
    if (!formState) return;

    if (formState.message) {
      toast({
        title: formState.success ? "성공" : "오류",
        description: formState.message,
        variant: formState.success ? "default" : "destructive",
      });
    }

    if (formState.success) {
      if(formRef.current) formRef.current.reset();
      reset({
        title: "",
        description: "",
        category: "",
        tags: "",
        price: 0
      });
    } else if (formState.fields) {
      // Re-populate form with previous data on server-side validation failure
      const { title, description, category, tags, price } = formState.fields;
      reset({ 
        title, 
        description, 
        category, 
        tags, 
        price: Number(price) || 0 
      });
    }
  }, [formState, toast, reset]);


  const handleGenerateDescription = async () => {
    if (!titleValue || titleValue.trim().length < 5) {
      toast({
        title: SELLER_DASHBOARD_STRINGS.GENERATION_ERROR,
        description: SELLER_DASHBOARD_STRINGS.GENERATION_ERROR_DESC_NO_TITLE,
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    const result = await generateDescriptionAction(titleValue);
    setIsGenerating(false);

    if (result.data) {
      const { productDescription, category, tags, price } = result.data;
      setValue("description", productDescription, { shouldValidate: true });
      setValue("category", category, { shouldValidate: true });
      setValue("tags", tags.join(', '), { shouldValidate: true });
      setValue("price", price, { shouldValidate: true });
      toast({
        title: SELLER_DASHBOARD_STRINGS.GENERATION_COMPLETE,
        description: SELLER_DASHBOARD_STRINGS.GENERATION_COMPLETE_DESC,
      });
    } else {
      toast({
        title: SELLER_DASHBOARD_STRINGS.GENERATION_ERROR,
        description: result.error,
        variant: "destructive",
      });
    }
  };
  
  const handleCategoryChange = (value: string) => {
    setValue('category', value, {shouldValidate: true});
  }

  return (
    <>
      <form ref={formRef} action={formAction} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">{SELLER_DASHBOARD_STRINGS.PRODUCT_TITLE_LABEL}</Label>
          <Input id="title" placeholder={SELLER_DASHBOARD_STRINGS.PRODUCT_TITLE_PLACEHOLDER} {...register("title")} />
          {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="description">{SELLER_DASHBOARD_STRINGS.PRODUCT_DESCRIPTION_LABEL}</Label>
            <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {BUTTONS.GENERATE_WITH_AI}
            </Button>
          </div>
          <Textarea
            id="description"
            placeholder={SELLER_DASHBOARD_STRINGS.PRODUCT_DESCRIPTION_PLACEHOLDER}
            className="min-h-[120px]"
            {...register("description")}
          />
          {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category">{SELLER_DASHBOARD_STRINGS.CATEGORY_LABEL}</Label>
            <Select name="category" value={categoryValue} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder={SELLER_DASHBOARD_STRINGS.CATEGORY_PLACEHOLDER} />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map(cat => (
                  <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
              {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">{SELLER_DASHBOARD_STRINGS.PRICE_LABEL}</Label>
            <Input id="price" type="number" placeholder={SELLER_DASHBOARD_STRINGS.PRICE_PLACEHOLDER} {...register("price")} />
            {errors.price && <p className="text-destructive text-sm">{errors.price.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">{SELLER_DASHBOARD_STRINGS.TAGS_LABEL}</Label>
          <Input id="tags" placeholder={SELLER_DASHBOARD_STRINGS.TAGS_PLACEHOLDER} {...register("tags")} />
          <p className="text-sm text-muted-foreground">{SELLER_DASHBOARD_STRINGS.TAGS_HINT}</p>
          {errors.tags && <p className="text-destructive text-sm">{errors.tags.message}</p>}
        </div>

        <SubmitButton />
      </form>

      {formState?.issues && formState.issues.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{SELLER_DASHBOARD_STRINGS.FORM_ERROR_TITLE}</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5">
              {formState.issues.map((issue, index) => (
                <li key={index}>{issue}</li>
              ))}
            </ul>
          </AlertDescription>
        </Alert>
      )}

      {formState?.qualityResult && (
        <Alert className="mt-4" variant={formState.qualityResult.isApproved ? "default" : "destructive"}>
            {formState.qualityResult.isApproved ? <CheckCircle className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
          <AlertTitle>{SELLER_DASHBOARD_STRINGS.QUALITY_REVIEW_RESULT}</AlertTitle>
          <AlertDescription>
            <p><strong>{SELLER_DASHBOARD_STRINGS.SCORE}:</strong> {(formState.qualityResult.qualityScore * 100).toFixed(0)}/100</p>
            <p><strong>{SELLER_DASHBOARD_STRINGS.STATUS}:</strong> {formState.qualityResult.isApproved ? SELLER_DASHBOARD_STRINGS.APPROVED : SELLER_DASHBOARD_STRINGS.PENDING_REVIEW}</p>
            <p className="mt-2"><strong>{SELLER_DASHBOARD_STRINGS.REASON}:</strong> {formState.qualityResult.reason}</p>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
