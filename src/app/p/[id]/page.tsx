
'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Eye, Heart, Send, ShoppingCart, Star, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { getProduct, getProductsByCategorySlug, getCategories } from "@/lib/firebase/services";
import { PromptCard } from "@/components/prompts/prompt-card";
import { useEffect, useState } from "react";
import type { Category, Prompt } from "@/lib/types";
import { useAuth } from "@/components/auth/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";

const mockReviews = [
    { id: 1, author: "김지훈", avatar: "https://picsum.photos/100/100?random=10", rating: 5, content: "이 보일러플레이트 덕분에 개발 시간이 절반으로 줄었어요! 퀄리티는 말할 것도 없고요." },
    { id: 2, author: "박서연", avatar: "https://picsum.photos/100/100?random=11", rating: 4, content: "디자인이 깔끔하고 사용하기 편합니다. 몇 가지 컴포넌트가 더 추가되면 좋겠어요." },
    { id: 3, author: "최민준", avatar: "https://picsum.photos/100/100?random=12", rating: 5, content: "AI 기능 연동이 정말 쉬워서 놀랐습니다. 강력 추천!" },
];


function ProductPageSkeleton() {
    return (
        <div className="container px-4 md:px-6">
             <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                 <div className="grid gap-4">
                     <Skeleton className="w-full aspect-[4/3] rounded-lg" />
                     <div className="grid grid-cols-5 gap-2">
                         {[...Array(5)].map((_, i) => <Skeleton key={i} className="w-full aspect-[4/3] rounded-md" />)}
                    </div>
                 </div>
                 <div className="flex flex-col gap-4 md:gap-6">
                     <Skeleton className="h-6 w-24" />
                     <Skeleton className="h-10 w-full" />
                     <Skeleton className="h-8 w-48" />
                     <Separator />
                     <Skeleton className="h-12 w-32" />
                      <div className="flex flex-col gap-2 mt-auto">
                          <div className="flex flex-col sm:flex-row gap-2">
                              <Skeleton className="h-12 w-full" />
                              <Skeleton className="h-12 w-full" />
                          </div>
                          <Skeleton className="h-12 w-full" />
                      </div>
                 </div>
             </div>
        </div>
    )
}

export default function PromptDetailPage({ params }: { params: { id: string } }) {
  const [prompt, setPrompt] = useState<Prompt | null>(null);
  const [relatedPrompts, setRelatedPrompts] = useState<Prompt[]>([]);
  const [categoryData, setCategoryData] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();
  const router = useRouter();
  
  useEffect(() => {
    async function fetchData() {
        try {
            setLoading(true);
            const fetchedPrompt = await getProduct(params.id);
            if (!fetchedPrompt) {
                notFound();
                return;
            }
            setPrompt(fetchedPrompt);
            
            const [categories, related] = await Promise.all([
                getCategories(),
                getProductsByCategorySlug(fetchedPrompt.categorySlug, 4, fetchedPrompt.id)
            ]);
            
            setRelatedPrompts(related);
            setCategoryData(categories.find(c => c.name === fetchedPrompt.category) || null);
            
        } catch (error) {
            console.error(error);
            notFound();
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, [params.id]);


  if (loading) {
    return <ProductPageSkeleton />;
  }

  if (!prompt) {
    return null;
  }
  
  const rating = prompt.rating ?? prompt.stats?.likes ?? 0;
  const reviews = prompt.reviews ?? prompt.stats?.sales ?? 0;

  const isFree = prompt.price === 0;

  return (
      <div className="container px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column: Image Gallery */}
          <div className="grid gap-4">
             <Image
              src={prompt.image}
              alt={prompt.title}
              width={700}
              height={525}
              className="object-cover w-full h-auto aspect-[4/3] rounded-lg shadow-lg border"
              data-ai-hint={prompt.aiHint}
            />
             <div className="grid grid-cols-5 gap-2">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src={`https://picsum.photos/200/150?random=${30 + i}`}
                  alt={`${prompt.title} thumbnail ${i + 1}`}
                  width={200}
                  height={150}
                  className="object-cover w-full h-auto aspect-[4/3] rounded-md cursor-pointer border hover:border-primary"
                  data-ai-hint="product screenshot"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Product Details & CTA */}
          <div className="flex flex-col gap-4 md:gap-6">
            <div>
              {categoryData && (
                <Link href={`/c/${categoryData.slug}`}>
                  <Badge>{prompt.category}</Badge>
                </Link>
              )}
              <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter mt-2">{prompt.title}</h1>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                 <Link href="#" className="flex items-center gap-2 hover:text-primary">
                      <Avatar className="h-8 w-8">
                          <AvatarImage src={`https://avatar.vercel.sh/${prompt.author}.png`} alt={prompt.author} data-ai-hint="person face" />
                          <AvatarFallback>{prompt.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{prompt.author}</span>
                 </Link>
                 <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-400" />
                      <span className="font-medium">{rating.toFixed(1)}</span>
                      <span>({reviews.toLocaleString()})</span>
                  </div>
              </div>
            </div>

            <Separator />
            
            <div className="text-4xl font-bold font-headline text-primary">
              {isFree ? "무료" : `₩${prompt.price.toLocaleString()}`}
            </div>

            { isFree ? (
                <div className="flex flex-col gap-2 mt-auto">
                    <Button size="lg" className="w-full">
                        <Eye className="mr-2"/>
                        콘텐츠 보기
                    </Button>
                    <Button size="lg" variant="outline" className="w-full">
                        <Download className="mr-2"/>
                        다운로드
                    </Button>
                </div>
            ) : user ? (
                <div className="flex flex-col gap-2 mt-auto">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <Button size="lg" variant="outline" className="w-full">
                            <Heart className="mr-2"/>
                            위시리스트
                        </Button>
                        <Button size="lg" variant="outline" className="w-full">
                            <ShoppingCart className="mr-2"/>
                            장바구니
                        </Button>
                    </div>
                    <Button size="lg" className="w-full text-lg h-12">
                        <Zap className="mr-2"/>
                        바로 구매
                    </Button>
                </div>
            ) : (
                 <div className="flex flex-col gap-2 mt-auto">
                      <Button size="lg" className="w-full text-lg h-12" onClick={() => router.push('/login')}>
                        <Zap className="mr-2"/>
                        로그인 후 구매
                    </Button>
                 </div>
            )}
          </div>
        </div>
        
        <Separator className="my-12 md:my-16" />

        {/* Detailed Info & Reviews Section */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="md:col-span-2 space-y-8">
              <div>
                  <h2 className="text-2xl font-bold font-headline mb-4">상품 상세 정보</h2>
                  <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                      <AccordionItem value="item-1">
                          <AccordionTrigger className="text-lg font-semibold">상품 설명</AccordionTrigger>
                          <AccordionContent>
                              <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed">
                                  <p>{prompt.description}</p>
                                  <Image src="https://picsum.photos/600/400?random=41" alt="Code example" width={600} height={400} className="rounded-lg my-4" data-ai-hint="code screenshot" />
                                  <p>주요 기능:</p>
                                  <ul>
                                      <li>Next.js 14 앱 라우터</li>
                                      <li>ShadCN UI 및 Tailwind CSS</li>
                                      <li>Firebase 인증 및 Firestore</li>
                                      <li>Genkit AI 통합</li>
                                  </ul>
                              </div>
                          </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                          <AccordionTrigger className="text-lg font-semibold">포함된 파일</AccordionTrigger>
                          <AccordionContent>
                              ZIP 파일에는 전체 Next.js 프로젝트 소스 코드가 포함되어 있습니다. (1.2MB)
                          </AccordionContent>
                      </AccordionItem>
                       <AccordionItem value="item-3">
                          <AccordionTrigger className="text-lg font-semibold">자주 묻는 질문</AccordionTrigger>
                          <AccordionContent>
                              <strong>Q: 상업적으로 이용할 수 있나요?</strong>
                              <p>A: 네, 구매 후 상업적 프로젝트를 포함하여 자유롭게 사용하실 수 있습니다. 재판매는 금지됩니다.</p>
                          </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              </div>

              <Separator/>

              <div>
                   <h2 className="text-2xl font-bold font-headline mb-4">구매자 후기 ({mockReviews.length})</h2>
                   <div className="space-y-6">
                      {mockReviews.map((review) => (
                         <div key={review.id} className="flex gap-4">
                              <Avatar>
                                  <AvatarImage src={review.avatar} alt={review.author} data-ai-hint="person face" />
                                  <AvatarFallback>{review.author.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                  <div className="flex items-center justify-between">
                                      <p className="font-semibold">{review.author}</p>
                                      <div className="flex items-center gap-1">
                                           {Array.from({ length: 5 }).map((_, i) => (
                                              <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-muted-foreground'}`} />
                                          ))}
                                      </div>
                                  </div>
                                  <p className="text-sm text-foreground/90 mt-1">{review.content}</p>
                              </div>
                         </div>
                      ))}
                   </div>
              </div>
          </div>
          
          <div className="md:col-span-1 space-y-6">
               <Card>
                  <CardHeader>
                      <h3 className="font-bold text-lg font-headline">판매자 정보</h3>
                  </CardHeader>
                  <CardContent className="text-center">
                       <Avatar className="h-20 w-20 mx-auto mb-4">
                          <AvatarImage src={`https://avatar.vercel.sh/${prompt.author}.png`} alt={prompt.author} data-ai-hint="person face" />
                          <AvatarFallback>{prompt.author.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <h4 className="font-bold text-lg">{prompt.author}</h4>
                      <p className="text-sm text-muted-foreground">AI와 자동화로 세상을 이롭게 합니다.</p>
                      <Button variant="outline" className="w-full mt-4">
                          <Send className="mr-2 h-4 w-4" />
                          판매자에게 문의
                      </Button>
                  </CardContent>
               </Card>
          </div>
        </div>

        <Separator className="my-12 md:my-16" />

        <div>
          <h2 className="text-2xl md:text-3xl font-bold font-headline tracking-tight mb-6">이 카테고리의 다른 상품</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {relatedPrompts.map((relatedPrompt) => (
                  <PromptCard key={relatedPrompt.id} prompt={relatedPrompt} />
              ))}
          </div>
        </div>
      </div>
  );
}
