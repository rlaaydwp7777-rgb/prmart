import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { PromptCard } from "@/components/prompts/prompt-card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FEATURED_PROMPTS } from "@/lib/constants";
import { Download, Eye, Heart, Send, ShoppingCart, Star, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getPromptDetails(id: string) {
  // In a real app, you would fetch this from a database.
  // We'll add more prompts to the search pool to make more products "findable"
  const allPrompts = [
    ...FEATURED_PROMPTS, 
    ...FEATURED_PROMPTS.map(p => ({...p, id: `${p.id}-2`})), 
    ...FEATURED_PROMPTS.map(p => ({...p, id: `${p.id}-3`}))
  ];
  return allPrompts.find((p) => p.id === id);
}

const mockReviews = [
    { id: 1, author: "김지훈", avatar: "https://picsum.photos/100/100?random=10", rating: 5, content: "이 보일러플레이트 덕분에 개발 시간이 절반으로 줄었어요! 퀄리티는 말할 것도 없고요." },
    { id: 2, author: "박서연", avatar: "https://picsum.photos/100/100?random=11", rating: 4, content: "디자인이 깔끔하고 사용하기 편합니다. 몇 가지 컴포넌트가 더 추가되면 좋겠어요." },
    { id: 3, author: "최민준", avatar: "https://picsum.photos/100/100?random=12", rating: 5, content: "AI 기능 연동이 정말 쉬워서 놀랐습니다. 강력 추천!" },
];

export default async function PromptDetailPage({ params }: { params: { id: string } }) {
  const prompt = await getPromptDetails(params.id);

  if (!prompt) {
    notFound();
  }
  
  // In a real app, this would be determined by checking the user's purchase history.
  const mockPurchaseStatus = true; 

  const relatedPrompts = FEATURED_PROMPTS.filter(p => p.category === prompt.category && p.id !== prompt.id).slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-12">
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
            </div>

            {/* Right Column: Product Details & CTA */}
            <div className="flex flex-col gap-4 md:gap-6">
              <div>
                <Badge>{prompt.category}</Badge>
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
                        <span className="font-medium">{prompt.rating.toFixed(1)}</span>
                        <span>({prompt.reviews.toLocaleString()})</span>
                    </div>
                </div>
              </div>

              <Separator />
              
              <div className="text-4xl font-bold font-headline text-primary">
                ₩{prompt.price.toLocaleString()}
              </div>

              {mockPurchaseStatus ? (
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
              ) : (
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
                                    <p>이 보일러플레이트는 최신 Next.js 14, TypeScript, Tailwind CSS, 그리고 prmart의 디자인 시스템을 기반으로 구축되었습니다. 인증, 데이터베이스 연동, 그리고 서버 컴포넌트의 모범 사례를 포함하여 여러분의 다음 프로젝트를 즉시 시작할 수 있도록 돕습니다. AI 기반 기능 통합을 위한 Genkit 설정이 포함되어 있습니다.</p>
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
      </main>
      <Footer />
    </div>
  );
}
