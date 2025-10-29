// src/app/seller/products/add/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useFormState, useFormStatus } from 'react-dom';
import { saveProductAction, FormState } from '@/app/actions';
import { useAuth } from '@/components/auth/AuthProvider';
import { getCategories } from '@/lib/firebase/services';
import type { Category } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Loader2, Wand2 } from 'lucide-react';
import { generateProductDescription } from '@/ai/flows/generate-product-description';


const productSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  description: z.string().min(20, "설명은 20자 이상이어야 합니다."),
  image: z.string().url("유효한 이미지 URL을 입력해주세요.").optional().or(z.literal('')),
  contentUrl: z.string().url("유효한 콘텐츠 URL을 입력해주세요.").optional().or(z.literal('')),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  price: z.coerce.number().min(0, "가격은 0 이상이어야 합니다."),
  tags: z.string().optional(),
  visibility: z.enum(['public', 'private', 'partial']),
  sellOnce: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

const initialState: FormState = { success: false, message: '' };

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" disabled={pending} size="lg">
            {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            상품 등록하기
        </Button>
    )
}

export default function AddProductPage() {
  const { user, loading: userLoading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      description: '',
      image: '',
      contentUrl: '',
      category: '',
      price: 0,
      tags: '',
      visibility: 'public',
      sellOnce: false,
    },
  });

  const [state, formAction] = useFormState(saveProductAction, initialState);

  useEffect(() => {
    if (state.message) { // Display toast only when a message is present
      if (state.success) {
        toast({ title: "성공", description: state.message });
        router.push('/seller/products');
      } else {
        toast({ title: "오류", description: state.message, variant: "destructive" });
      }
    }
  }, [state, router, toast]);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  const handleGenerateWithAi = async () => {
    const title = form.getValues('title');
    if (!title) {
        toast({ title: "알림", description: "먼저 상품 제목을 입력해주세요.", variant: "destructive" });
        return;
    }
    setIsAiGenerating(true);
    try {
        const result = await generateProductDescription({ productTitle: title });
        form.setValue('description', result.productDescription);
        form.setValue('category', result.category);
        form.setValue('tags', result.tags.join(', '));
        form.setValue('price', result.price);
        toast({ title: "AI 생성 완료", description: "상품 정보가 자동으로 채워졌습니다."});
    } catch (error) {
        console.error("AI generation failed", error);
        toast({ title: "AI 생성 실패", description: "내용 생성 중 오류가 발생했습니다.", variant: "destructive" });
    } finally {
        setIsAiGenerating(false);
    }
  };


  if (userLoading) {
    return <div className="flex justify-center items-center h-full"><Loader2 className="w-8 h-8 animate-spin" /></div>;
  }

  const wrappedAction = (formData: FormData) => {
    if (!user) {
        toast({ title: "오류", description: "로그인이 필요합니다.", variant: "destructive" });
        return;
    }
    formData.append('sellerId', user.uid);
    formData.append('author', user.displayName || user.email!);
    formData.append('sellerPhotoUrl', user.photoURL || '');
    return formAction(formData);
};

  return (
    <FormProvider {...form}>
      <form action={wrappedAction} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>새 상품 등록</CardTitle>
            <CardDescription>판매할 디지털 상품의 정보를 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상품 제목</FormLabel>
                  <div className="flex gap-2">
                    <FormControl>
                      <Input placeholder="예: SEO 최적화 블로그 포스팅 자동화 프롬프트" {...field} />
                    </FormControl>
                    <Button type="button" variant="outline" onClick={handleGenerateWithAi} disabled={isAiGenerating}>
                        {isAiGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <Wand2 className="mr-2 h-4 w-4" />}
                        AI로 생성
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>상세 설명</FormLabel>
                  <FormControl>
                    <Textarea placeholder="상품에 대해 자세하게 설명해주세요. 주요 기능, 사용법, 기대 효과 등을 포함하면 좋습니다." {...field} rows={8} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>카테고리</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리를 선택하세요" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>판매 가격 (원)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>태그</FormLabel>
                  <FormControl>
                    <Input placeholder="쉼표(,)로 구분하여 입력하세요. 예: chatgpt, 블로그, 자동화" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid md:grid-cols-2 gap-6">
                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>상품 이미지 URL</FormLabel>
                        <FormControl>
                            <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="contentUrl"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>콘텐츠 다운로드 URL (선택)</FormLabel>
                        <FormControl>
                            <Input placeholder="구매자가 다운로드할 파일/링크 URL" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="visibility"
                render={({ field }) => (
                    <FormItem className="space-y-3">
                    <FormLabel>공개 범위 설정</FormLabel>
                    <FormControl>
                        <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                        >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="public" />
                            </FormControl>
                            <FormLabel className="font-normal">
                            전체 공개 (누구나 상세 설명 보기 가능)
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="partial" />
                            </FormControl>
                            <FormLabel className="font-normal">
                            부분 공개 (미리보기만 제공)
                            </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                            <RadioGroupItem value="private" />
                            </FormControl>
                            <FormLabel className="font-normal">
                            비공개 (구매자만 보기 가능)
                            </FormLabel>
                        </FormItem>
                        </RadioGroup>
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="sellOnce"
                render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                    <FormControl>
                        <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                        <FormLabel>
                        한정 판매 (단 한 명에게만 판매)
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                        이 옵션을 선택하면 상품이 한 번 판매된 후 자동으로 판매 중지됩니다.
                        </p>
                    </div>
                    </FormItem>
                )}
            />

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
          </CardContent>
        </Card>
      </form>
    </FormProvider>
  );
}
