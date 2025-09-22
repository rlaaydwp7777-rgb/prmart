// src/app/seller/products/add/page.tsx
"use client";

import { useState, useActionState, useEffect, useRef } from 'react';
import { useFormStatus } from 'react-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Upload, Sparkles, Loader2, Info, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SELLER_STRINGS } from '@/lib/string-constants';
import type { Category } from '@/lib/types';
import { getCategories } from '@/lib/firebase/services';
import { saveProductAction, type FormState } from '@/app/actions';
import { useAuth } from '@/components/auth/AuthProvider';

const initialState: FormState = {
  message: '',
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button size="lg" className="w-full" type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {SELLER_STRINGS.REGISTER_PRODUCT}
    </Button>
  );
}

export default function AddProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [state, formAction] = useActionState(saveProductAction, initialState);
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

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
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다.</h1>
            <p className="text-muted-foreground mb-6">상품을 등록하려면 먼저 로그인해주세요.</p>
        </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{SELLER_STRINGS.ADD_NEW_PRODUCT}</h1>
            <p className="text-muted-foreground mt-1">판매할 상품의 정보를 입력해주세요.</p>
        </header>
      
      <form ref={formRef} action={formAction} className="space-y-8">
        <input type="hidden" name="sellerId" value={user.uid} />
        <input type="hidden" name="author" value={user.displayName || user.email!} />
        <input type="hidden" name="sellerPhotoUrl" value={user.photoURL || ''} />

        <Card>
          <CardHeader>
            <CardTitle>{SELLER_STRINGS.STEP_1}</CardTitle>
            <CardDescription>상품의 기본 정보를 정확하게 입력해주세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">{SELLER_STRINGS.PRODUCT_TITLE_LABEL}</Label>
              <Input
                id="title"
                name="title"
                placeholder={SELLER_STRINGS.PRODUCT_TITLE_PLACEHOLDER}
                className="text-base h-12"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">{SELLER_STRINGS.PRODUCT_DESCRIPTION_LABEL}</Label>
              <Textarea
                id="description"
                name="description"
                placeholder={SELLER_STRINGS.PRODUCT_DESCRIPTION_PLACEHOLDER}
                className="min-h-48 text-base"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                  <Label htmlFor="image" className="text-base">{SELLER_STRINGS.PRODUCT_IMAGES_LABEL}</Label>
                  <div className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-2 text-muted-foreground"/>
                            <p className="text-xs text-muted-foreground">{SELLER_STRINGS.PRODUCT_IMAGES_HINT}</p>
                        </div>
                        <Input id="dropzone-file" name="imageFile" type="file" className="hidden" />
                    </label>
                  </div> 
                   <Input name="image" placeholder="또는 이미지 URL 입력: https://picsum.photos/seed/product/400/300" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contentUrl" className="text-base">{SELLER_STRINGS.PRODUCT_CONTENT_URL}</Label>
                  <Input id="contentUrl" name="contentUrl" placeholder={SELLER_STRINGS.PRODUCT_CONTENT_URL_PLACEHOLDER} className="text-base h-11" />
                  <p className="text-sm text-muted-foreground">{SELLER_STRINGS.PRODUCT_CONTENT_URL_HINT}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{SELLER_STRINGS.CATEGORY_LABEL}</Label>
                <Select name="category" required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder={SELLER_STRINGS.CATEGORY_PLACEHOLDER} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">{SELLER_STRINGS.PRICE_LABEL}</Label>
                <Input id="price" name="price" type="number" placeholder={SELLER_STRINGS.PRICE_PLACEHOLDER} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">{SELLER_STRINGS.TAGS_LABEL}</Label>
                <Input id="tags" name="tags" placeholder={SELLER_STRINGS.TAGS_PLACEHOLDER} />
                <p className="text-sm text-muted-foreground">{SELLER_STRINGS.TAGS_HINT}</p>
              </div>
            </div>
             <div className="flex items-center space-x-2">
              <Switch id="sellOnce" name="sellOnce" />
              <Label htmlFor="sellOnce">{SELLER_STRINGS.SELL_ONCE_LABEL}</Label>
            </div>
          </CardContent>
        </Card>
        
        <Card>
            <CardHeader>
                <CardTitle>공개 범위 설정</CardTitle>
                <CardDescription>구매자에게 상품 정보를 어떻게 노출할지 선택하세요.</CardDescription>
            </CardHeader>
            <CardContent>
                <RadioGroup name="visibility" defaultValue="public" className="space-y-4">
                    <div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="public" id="public" />
                            <Label htmlFor="public">{SELLER_STRINGS.VISIBILITY_PUBLIC}</Label>
                        </div>
                        <p className="pl-6 text-sm text-muted-foreground">{SELLER_STRINGS.VISIBILITY_PUBLIC_DESC}</p>
                    </div>
                    <div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="private" id="private" />
                            <Label htmlFor="private">{SELLER_STRINGS.VISIBILITY_PRIVATE}</Label>
                        </div>
                        <p className="pl-6 text-sm text-muted-foreground">{SELLER_STRINGS.VISIBILITY_PRIVATE_DESC}</p>
                    </div>
                     <div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="partial" id="partial" />
                            <Label htmlFor="partial">{SELLER_STRINGS.VISIBILITY_PARTIAL}</Label>
                        </div>
                         <p className="pl-6 text-sm text-muted-foreground">{SELLER_STRINGS.VISIBILITY_PARTIAL_DESC}</p>
                    </div>
                </RadioGroup>
            </CardContent>
             <CardFooter className="flex flex-col items-start gap-4">
                <SubmitButton />
                {state?.issues && (
                    <div className="text-sm text-destructive text-center w-full">
                        {state.issues.map((issue, i) => <p key={i}>{issue}</p>)}
                    </div>
                )}
            </CardFooter>
        </Card>
      </form>
    </div>
  );
}
