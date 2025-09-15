
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateDescriptionAction, registerProductAction } from "@/app/actions";
import type { FormState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, Loader2, Sparkles, Terminal, XCircle, UploadCloud, Image as ImageIcon, FileText, Globe, Lock, Eye } from "lucide-react";
import { BUTTONS, SELLER_STRINGS } from "@/lib/string-constants";
import { Switch } from "../ui/switch";
import { getCategories } from "@/lib/firebase/services";
import type { Category, PromptVisibility } from "@/lib/types";
import { useAuth } from "../auth/auth-provider";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const productSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  description: z.string().min(20, "설명은 20자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  tags: z.string().min(1, "태그를 하나 이상 입력해주세요."),
  price: z.coerce.number().min(0, "가격은 0 이상의 숫자여야 합니다."),
  sellOnce: z.boolean().optional(),
  visibility: z.enum(['public', 'private', 'partial']),
  sellerId: z.string().optional(),
  author: z.string().optional(),
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
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <UploadCloud className="mr-2 h-4 w-4" />}
      {BUTTONS.REGISTER_PRODUCT}
    </Button>
  );
}

interface ProductRegistrationFormProps {
    onProductRegistered?: () => void;
}

export function ProductRegistrationForm({ onProductRegistered }: ProductRegistrationFormProps) {
  const [formState, formAction] = useActionState(registerProductAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    async function fetchCategories() {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
    }
    fetchCategories();
  }, [])
  
  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      tags: "",
      price: 0,
      sellOnce: false,
      visibility: "public",
    }
  });
  
  const titleValue = watch("title");
  const categoryValue = watch("category");
  const sellOnceValue = watch("sellOnce");
  const visibilityValue = watch("visibility");


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
        price: 0,
        sellOnce: false,
        visibility: 'public',
      });
      onProductRegistered?.();
    } else if (formState.fields) {
      // Re-populate form with previous data on server-side validation failure
      const { title, description, category, tags, price, sellOnce, visibility } = formState.fields;
      reset({ 
        title, 
        description, 
        category, 
        tags, 
        price: Number(price) || 0,
        sellOnce: !!sellOnce,
        visibility: visibility || 'public'
      });
    }
  }, [formState, toast, reset, onProductRegistered]);


  const handleGenerateDescription = async () => {
    if (!titleValue || titleValue.trim().length < 5) {
      toast({
        title: SELLER_STRINGS.GENERATION_ERROR,
        description: SELLER_STRINGS.GENERATION_ERROR_DESC_NO_TITLE,
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
        title: SELLER_STRINGS.GENERATION_COMPLETE,
        description: SELLER_STRINGS.GENERATION_COMPLETE_DESC,
      });
    } else {
      toast({
        title: SELLER_STRINGS.GENERATION_ERROR,
        description: result.error,
        variant: "destructive",
      });
    }
  };
  
  const handleCategoryChange = (value: string) => {
    setValue('category', value, {shouldValidate: true});
  }

  const handleSellOnceChange = (checked: boolean) => {
    setValue('sellOnce', checked, { shouldValidate: true });
  };
  
  const handleVisibilityChange = (value: PromptVisibility) => {
    setValue('visibility', value, { shouldValidate: true });
  };


  return (
    <>
      <form ref={formRef} action={formAction} className="space-y-6">
        <input type="hidden" {...register("sellerId")} value={user?.uid || ''} />
        <input type="hidden" {...register("author")} value={user?.displayName || user?.email || 'prmart seller'} />
        
        <div className="space-y-2">
          <Label htmlFor="title">{SELLER_STRINGS.PRODUCT_TITLE_LABEL}</Label>
          <Input id="title" placeholder={SELLER_STRINGS.PRODUCT_TITLE_PLACEHOLDER} {...register("title")} />
          {errors.title && <p className="text-destructive text-sm">{errors.title.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="category">{SELLER_STRINGS.CATEGORY_LABEL}</Label>
            <Select name="category" value={categoryValue} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category">
                <SelectValue placeholder={SELLER_STRINGS.CATEGORY_PLACEHOLDER} />
              </SelectTrigger>
              <SelectContent>
                {categories.map(cat => (
                  <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
              {errors.category && <p className="text-destructive text-sm">{errors.category.message}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="price">{SELLER_STRINGS.PRICE_LABEL}</Label>
            <Input id="price" type="number" placeholder={SELLER_STRINGS.PRICE_PLACEHOLDER} {...register("price")} />
            {errors.price && <p className="text-destructive text-sm">{errors.price.message}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">{SELLER_STRINGS.TAGS_LABEL}</Label>
          <Input id="tags" placeholder={SELLER_STRINGS.TAGS_PLACEHOLDER} {...register("tags")} />
          <p className="text-sm text-muted-foreground">{SELLER_STRINGS.TAGS_HINT}</p>
          {errors.tags && <p className="text-destructive text-sm">{errors.tags.message}</p>}
        </div>
        
        <div className="space-y-4">
            <div className="flex items-center space-x-2">
                <Switch id="sell-once" name="sellOnce" checked={sellOnceValue} onCheckedChange={handleSellOnceChange} />
                <Label htmlFor="sell-once">{SELLER_STRINGS.SELL_ONCE_LABEL}</Label>
            </div>
            
            <div className="space-y-2">
                <Label>{SELLER_STRINGS.VISIBILITY_LABEL}</Label>
                <RadioGroup
                    defaultValue="public"
                    name="visibility"
                    value={visibilityValue}
                    onValueChange={handleVisibilityChange}
                    className="grid grid-cols-1 md:grid-cols-3 gap-4"
                >
                    <Label className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                       <RadioGroupItem value="public" id="public" />
                       <div className="grid gap-1.5">
                           <div className="font-semibold flex items-center"><Globe className="mr-2 h-4 w-4 text-muted-foreground" /> {SELLER_STRINGS.VISIBILITY_PUBLIC}</div>
                           <p className="text-sm text-muted-foreground">{SELLER_STRINGS.VISIBILITY_PUBLIC_DESC}</p>
                       </div>
                    </Label>
                    <Label className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                        <RadioGroupItem value="private" id="private" />
                         <div className="grid gap-1.5">
                           <div className="font-semibold flex items-center"><Lock className="mr-2 h-4 w-4 text-muted-foreground" /> {SELLER_STRINGS.VISIBILITY_PRIVATE}</div>
                           <p className="text-sm text-muted-foreground">{SELLER_STRINGS.VISIBILITY_PRIVATE_DESC}</p>
                       </div>
                    </Label>
                    <Label className="flex items-center gap-3 p-4 border rounded-md cursor-pointer hover:bg-muted/50 has-[input:checked]:border-primary has-[input:checked]:bg-primary/5">
                        <RadioGroupItem value="partial" id="partial" />
                        <div className="grid gap-1.5">
                           <div className="font-semibold flex items-center"><Eye className="mr-2 h-4 w-4 text-muted-foreground" /> {SELLER_STRINGS.VISIBILITY_PARTIAL}</div>
                           <p className="text-sm text-muted-foreground">{SELLER_STRINGS.VISIBILITY_PARTIAL_DESC}</p>
                       </div>
                    </Label>
                </RadioGroup>
            </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor="product-images">{SELLER_STRINGS.PRODUCT_IMAGES_LABEL}</Label>
            <div className="border-2 border-dashed border-muted-foreground/50 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50">
              <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-4 text-muted-foreground">
                {SELLER_STRINGS.PRODUCT_IMAGES_HINT}
              </p>
              <Input id="product-images" type="file" className="sr-only" multiple />
            </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="description">{SELLER_STRINGS.PRODUCT_DESCRIPTION_LABEL}</Label>
            <Button type="button" variant="outline" size="sm" onClick={handleGenerateDescription} disabled={isGenerating}>
              {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
              {BUTTONS.GENERATE_WITH_AI}
            </Button>
          </div>
           <Card>
              <CardContent className="p-2 space-y-2">
                <div className="flex gap-1">
                    <Button variant="ghost" size="sm"><ImageIcon className="mr-2 h-4 w-4" /> {SELLER_STRINGS.ADD_IMAGE}</Button>
                    <Button variant="ghost" size="sm"><FileText className="mr-2 h-4 w-4" /> {SELLER_STRINGS.IMPORT_TEMPLATE}</Button>
                </div>
                <Textarea
                    id="description"
                    placeholder={SELLER_STRINGS.PRODUCT_DESCRIPTION_PLACEHOLDER}
                    className="min-h-[250px] border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-base"
                    {...register("description")}
                />
              </CardContent>
            </Card>
          {errors.description && <p className="text-destructive text-sm">{errors.description.message}</p>}
        </div>

        <SubmitButton />
      </form>

      {formState?.issues && formState.issues.length > 0 && (
        <Alert variant="destructive" className="mt-4">
          <Terminal className="h-4 w-4" />
          <AlertTitle>{SELLER_STRINGS.FORM_ERROR_TITLE}</AlertTitle>
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
          <AlertTitle>{SELLER_STRINGS.QUALITY_REVIEW_RESULT}</AlertTitle>
          <AlertDescription>
            <p><strong>{SELLER_STRINGS.SCORE}:</strong> {(formState.qualityResult.qualityScore * 100).toFixed(0)}/100</p>
            <p><strong>{SELLER_STRINGS.STATUS}:</strong> {formState.qualityResult.isApproved ? SELLER_STRINGS.APPROVED : SELLER_STRINGS.PENDING_REVIEW}</p>
            <p className="mt-2"><strong>{SELLER_STRINGS.REASON}:</strong> {formState.qualityResult.reason}</p>
          </AlertDescription>
        </Alert>
      )}
    </>
  );
}
