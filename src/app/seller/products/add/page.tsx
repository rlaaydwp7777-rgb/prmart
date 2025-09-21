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
import { assessContentQuality } from '@/ai/flows/ai-content-quality-control';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { saveProductAction, type FormState } from '@/app/actions';

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
  
  // AI Feature States
  const [isGenerating, setIsGenerating] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [generatedCategory, setGeneratedCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [price, setPrice] = useState<number | string>('');
  const [reviewResult, setReviewResult] = useState<any>(null);

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
      // Reset all states
      setTitle('');
      setDescription('');
      setGeneratedCategory('');
      setTags([]);
      setPrice('');
      setReviewResult(null);
    }
  }, [state, toast]);

  const handleGenerateDescription = async () => {
    if (!title || title.length < 5) {
      toast({
        title: SELLER_STRINGS.GENERATION_ERROR,
        description: SELLER_STRINGS.GENERATION_ERROR_DESC_NO_TITLE,
        variant: "destructive",
      });
      return;
    }
    setIsGenerating(true);
    try {
      const result = await generateProductDescription({ productTitle: title });
      setDescription(result.productDescription);
      setGeneratedCategory(result.category);
      setTags(result.tags);
      setPrice(result.price);
      toast({
        title: SELLER_STRINGS.GENERATION_COMPLETE,
        description: SELLER_STRINGS.GENERATION_COMPLETE_DESC,
      });
    } catch (e: any) {
      toast({ title: SELLER_STRINGS.GENERATION_ERROR, description: e.message, variant: "destructive" });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleQualityReview = async () => {
      setIsReviewing(true);
      setReviewResult(null);
      try {
          const result = await assessContentQuality({ title, description, category: generatedCategory, tags });
          setReviewResult(result);
      } catch (e: any) {
          toast({ title: "검수 오류", description: e.message, variant: "destructive" });
      } finally {
          setIsReviewing(false);
      }
  }

  return (
    <div className="max-w-4xl mx-auto">
        <header className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">{SELLER_STRINGS.ADD_NEW_PRODUCT}</h1>
            <p className="text-muted-foreground mt-1">{SELLER_STRINGS.AI_ASSISTANT_DESCRIPTION}</p>
        </header>
      
      <form ref={formRef} action={formAction} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>{SELLER_STRINGS.STEP_1}</CardTitle>
            <CardDescription>상품의 기본 정보를 입력하고 AI의 도움을 받아 설명을 완성하세요.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-base">{SELLER_STRINGS.PRODUCT_TITLE_LABEL}</Label>
              <div className="flex gap-2">
                <Input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={SELLER_STRINGS.PRODUCT_TITLE_PLACEHOLDER}
                  className="text-base h-12"
                  required
                />
                <Button type="button" size="lg" className="h-12" onClick={handleGenerateDescription} disabled={isGenerating}>
                  {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2" />}
                  {SELLER_STRINGS.GENERATE_WITH_AI}
                </Button>
              </div>
            </div>
            
             <div className="space-y-2">
              <Label htmlFor="image" className="text-base">{SELLER_STRINGS.PRODUCT_IMAGES_LABEL}</Label>
              <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-muted-foreground"/>
                        <p className="mb-2 text-sm text-muted-foreground">{SELLER_STRINGS.PRODUCT_IMAGES_HINT}</p>
                    </div>
                    <Input id="dropzone-file" name="imageFile" type="file" className="hidden" />
                </label>
              </div> 
               <Input name="image" placeholder="https://picsum.photos/seed/product/400/300" defaultValue="https://picsum.photos/seed/product/400/300"/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contentUrl" className="text-base">{SELLER_STRINGS.PRODUCT_CONTENT_URL}</Label>
              <Input id="contentUrl" name="contentUrl" placeholder={SELLER_STRINGS.PRODUCT_CONTENT_URL_PLACEHOLDER} className="text-base h-11" />
              <p className="text-sm text-muted-foreground">{SELLER_STRINGS.PRODUCT_CONTENT_URL_HINT}</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-base">{SELLER_STRINGS.PRODUCT_DESCRIPTION_LABEL}</Label>
              <Textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={SELLER_STRINGS.PRODUCT_DESCRIPTION_PLACEHOLDER}
                className="min-h-48 text-base"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">{SELLER_STRINGS.CATEGORY_LABEL}</Label>
                <Select name="category" value={generatedCategory} onValueChange={setGeneratedCategory} required>
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
                <Input id="price" name="price" type="number" placeholder={SELLER_STRINGS.PRICE_PLACEHOLDER} value={price} onChange={(e) => setPrice(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">{SELLER_STRINGS.TAGS_LABEL}</Label>
                <Input id="tags" name="tags" placeholder={SELLER_STRINGS.TAGS_PLACEHOLDER} value={tags.join(', ')} onChange={(e) => setTags(e.target.value.split(',').map(t => t.trim()))} />
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
                <CardTitle>{SELLER_STRINGS.STEP_2}</CardTitle>
                <CardDescription>AI 품질 검수를 통해 상품의 매력도를 확인하고 개선점을 찾아보세요.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button type="button" onClick={handleQualityReview} disabled={isReviewing || !title || !description}>
                    {isReviewing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Info className="mr-2" />}
                    AI 품질 검수 실행
                </Button>
                 {reviewResult && (
                    <Card className={reviewResult.isApproved ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}>
                        <CardHeader>
                             <CardTitle className="flex items-center justify-between">
                                {SELLER_STRINGS.QUALITY_REVIEW_RESULT}
                                <Button variant="ghost" size="icon" onClick={() => setReviewResult(null)}><X className="h-4 w-4"/></Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p><strong>{SELLER_STRINGS.SCORE}:</strong> <span className="font-bold">{Math.round(reviewResult.qualityScore * 100)}점</span></p>
                            <p><strong>{SELLER_STRINGS.STATUS}:</strong> <span className={reviewResult.isApproved ? 'text-green-700 font-semibold' : 'text-red-700 font-semibold'}>{reviewResult.isApproved ? SELLER_STRINGS.APPROVED : SELLER_STRINGS.PENDING_REVIEW}</span></p>
                            <p><strong>{SELLER_STRINGS.REASON}:</strong> {reviewResult.reason}</p>
                        </CardContent>
                    </Card>
                 )}
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
