
"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Download, Eye, Heart, Lock, Send, ShoppingCart, Star, Zap, Clock, User, LogIn, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Category, Prompt, Review } from "@/lib/types";
import { PromptCard } from "./prompt-card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { format } from 'date-fns';

// This is still mock data, but will be replaced by a fetch from Firestore.
const mockReviews: Review[] = [
    // { id: 'rev1', author: "김지훈", authorId: 'user1', productId: 'prod1', productTitle: 'test', avatar: "https://picsum.photos/100/100?random=10", rating: 5, content: "이 보일러플레이트 덕분에 개발 시간이 절반으로 줄었어요! 퀄리티는 말할 것도 없고요.", createdAt: new Date().toISOString() },
];

interface PromptDetailClientProps {
    prompt: Prompt;
    relatedPrompts: Prompt[];
    categoryData: Category | null;
}

export function PromptDetailClient({ prompt, relatedPrompts, categoryData }: PromptDetailClientProps) {
  const router = useRouter();

  const rating = prompt.rating ?? prompt.stats?.likes ?? 0;
  const reviewsCount = prompt.reviews ?? prompt.stats?.sales ?? 0;

  const isFree = prompt.price === 0;
  const hasPurchased = false; // This will be dynamic based on user auth and purchase history

  const canViewFullContent = hasPurchased || isFree;
  const canViewPartialContent = prompt.visibility === 'public' || prompt.visibility === 'partial';

  const handlePurchase = () => {
    // TODO: Implement actual purchase logic (e.g., redirect to checkout)
    alert("결제 기능은 현재 준비 중입니다.");
  };

  const renderCtaButtons = () => {
    if (isFree) {
       return (
        <Button size="lg" className="w-full text-lg h-12" onClick={() => alert('다운로드 시작!')}>
            <Download className="mr-2"/>
            무료 다운로드
        </Button>
      );
    }
    
    return (
      <div className="flex flex-col gap-2">
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
        <Button size="lg" className="w-full text-lg h-12" onClick={handlePurchase}>
            <Zap className="mr-2"/>
            바로 구매
        </Button>
      </div>
    );
  }

  const renderContent = () => {
    if (!canViewPartialContent && !hasPurchased) {
        return (
            <Card className="flex flex-col items-center justify-center text-center p-8 border-dashed">
                <Lock className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-bold font-headline">구매자 전용 콘텐츠입니다</h3>
                <p className="text-muted-foreground mt-2">이 상품의 상세 정보는 구매한 사용자에게만 공개됩니다.</p>
                 <Button className="mt-6" onClick={handlePurchase}>
                    <Zap className="mr-2 h-4 w-4"/>
                    구매하고 콘텐츠 보기
                </Button>
            </Card>
        )
    }

    return (
        <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg font-semibold">상품 설명</AccordionTrigger>
                <AccordionContent>
                    <div className="prose prose-sm max-w-none text-foreground/90 leading-relaxed">
                        <p>{prompt.description}</p>
                        {!canViewFullContent && (
                            <Alert className="mt-4 border-primary/30 bg-primary/5">
                                <Eye className="h-4 w-4" />
                                <AlertTitle>콘텐츠 미리보기</AlertTitle>
                                <AlertDescription>
                                    구매하시면 전체 콘텐츠를 확인하실 수 있습니다. 아래 내용은 일부만 공개됩니다.
                                </AlertDescription>
                            </Alert>
                        )}
                        <Image src="https://picsum.photos/600/400?random=41" alt="Code example" width={600} height={400} className="rounded-lg my-4" data-ai-hint="code screenshot" />
                        
                        {!canViewFullContent && (
                             <div className="relative">
                                <div className="blur-sm grayscale">
                                    <p>주요 기능:</p>
                                    <ul>
                                        <li>Next.js 14 앱 라우터</li>
                                        <li>ShadCN UI 및 Tailwind CSS</li>
                                        <li>Firebase 인증 및 Firestore</li>
                                        <li>Genkit AI 통합</li>
                                    </ul>
                                </div>
                                <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/80">
                                    <Lock className="h-8 w-8 text-muted-foreground mb-4" />
                                    <h3 className="font-bold">전체 내용을 보려면 구매하세요</h3>
                                    <Button size="sm" className="mt-4" onClick={handlePurchase}>
                                        <Zap className="mr-2 h-4 w-4" />
                                        구매하기
                                    </Button>
                                </div>
                            </div>
                        )}

                        {canViewFullContent && (
                             <div>
                                <p>주요 기능:</p>
                                <ul>
                                    <li>Next.js 14 앱 라우터</li>
                                    <li>ShadCN UI 및 Tailwind CSS</li>
                                    <li>Firebase 인증 및 Firestore</li>
                                    <li>Genkit AI 통합</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg font-semibold">포함된 파일</AccordionTrigger>
                <AccordionContent>
                    {prompt.contentUrl ? 
                        ( canViewFullContent ? 
                            <Button asChild>
                                <a href={prompt.contentUrl} target="_blank" rel="noopener noreferrer">
                                    <Download className="mr-2 h-4 w-4" />
                                    콘텐츠 다운로드
                                </a>
                            </Button> :
                             <p className="flex items-center text-muted-foreground"><Lock className="mr-2 h-4 w-4"/>구매 후 콘텐츠 링크를 확인할 수 있습니다.</p>
                        ) : (
                            <p>ZIP 파일에는 전체 Next.js 프로젝트 소스 코드가 포함되어 있습니다. (1.2MB)</p>
                        )
                    }
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
    )
  }

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
               <Link href={`/seller/${prompt.sellerId}`} className="flex items-center gap-2 hover:text-primary">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={prompt.sellerPhotoUrl || `https://avatar.vercel.sh/${prompt.author}.png`} alt={prompt.author} data-ai-hint="person face" />
                        <AvatarFallback>{prompt.author.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{prompt.author}</span>
               </Link>
               <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400" />
                    <span className="font-medium">{rating.toFixed(1)}</span>
                    <span>({reviewsCount.toLocaleString()})</span>
                </div>
                 {prompt.updatedAt && (
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4"/>
                        <span>업데이트: {format(new Date(prompt.updatedAt), "yyyy-MM-dd")}</span>
                    </div>
                )}
            </div>
          </div>

          <Separator />
          
          <div className="text-4xl font-bold font-headline text-primary">
            {isFree ? "무료" : `₩${prompt.price.toLocaleString()}`}
          </div>

          <div className="mt-auto">
            {renderCtaButtons()}
          </div>
        </div>
      </div>
      
      <Separator className="my-12 md:my-16" />

      {/* Detailed Info & Reviews Section */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-2 space-y-8">
            <div>
                <h2 className="text-2xl font-bold font-headline mb-4">상품 상세 정보</h2>
                {renderContent()}
            </div>

            <Separator/>

            <div>
                 <h2 className="text-2xl font-bold font-headline mb-4">구매자 후기 ({mockReviews.length})</h2>
                 <div className="space-y-6">
                    {mockReviews.length > 0 ? mockReviews.map((review) => (
                       <div key={review.id} className="flex gap-4">
                            <Avatar>
                                <AvatarImage src={review.authorAvatar} alt={review.author} data-ai-hint="person face" />
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
                    )) : (
                        <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed rounded-lg">
                            <MessageCircle className="h-10 w-10 text-muted-foreground mb-4" />
                            <h3 className="font-semibold">아직 등록된 후기가 없습니다.</h3>
                            <p className="text-sm text-muted-foreground mt-1">이 상품의 첫 번째 후기를 작성해주세요!</p>
                        </div>
                    )}
                 </div>
            </div>
        </div>
        
        <div className="md:col-span-1 space-y-6">
             <Card>
                <CardHeader>
                    <h3 className="font-bold text-lg font-headline">판매자 정보</h3>
                </CardHeader>
                <CardContent className="text-center">
                    <Link href={`/seller/${prompt.sellerId}`}>
                        <Avatar className="h-20 w-20 mx-auto mb-4">
                            <AvatarImage src={prompt.sellerPhotoUrl || `https://avatar.vercel.sh/${prompt.author}.png`} alt={prompt.author} data-ai-hint="person face" />
                            <AvatarFallback>{prompt.author.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <h4 className="font-bold text-lg hover:underline">{prompt.author}</h4>
                    </Link>
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
