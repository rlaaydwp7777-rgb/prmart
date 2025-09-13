
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search as SearchIcon, Wallet, Download, Upload, BadgeDollarSign, Banknote, Quote, ShieldCheck } from "lucide-react";
import { PromptCard } from "@/components/prompts/prompt-card";
import { BUTTONS, HEADER_LINKS, ICONS } from "@/lib/string-constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Category, Prompt } from "@/lib/types";
import { getProducts, getCategories } from "@/lib/firebase/services";

const testimonials = [
  {
    quote: "이 템플릿 덕분에 개발 시간이 절반으로 줄었어요! 퀄리티는 말할 것도 없고요. 다음 프로젝트에도 무조건 재구매각입니다.",
    author: "김지훈",
    role: "풀스택 개발자",
    avatar: "https://picsum.photos/seed/testimonial-1/100/100",
    aiHint: "person face"
  },
  {
    quote: "prmart에서 판매를 시작하고 월급만큼의 부수입을 얻고 있어요. 제 노하우가 다른 사람에게 도움이 된다는 사실이 정말 뿌듯합니다.",
    author: "박서연",
    role: "마케팅 전문가",
    avatar: "https://picsum.photos/seed/testimonial-2/100/100",
    aiHint: "person face"
  },
  {
    quote: "디자인 리소스 찾느라 시간 낭비할 필요가 없어졌어요. prmart에는 퀄리티 높은 자료가 넘쳐나서 작업 효율이 극대화되었습니다.",
    author: "최민준",
    role: "UI/UX 디자이너",
    avatar: "https://picsum.photos/seed/testimonial-3/100/100",
    aiHint: "person face"
  },
];


const buyerSteps = [
    {
      icon: SearchIcon,
      title: "1. 아이디어 탐색",
      description: "필요한 노하우, 템플릿, 프롬프트를 카테고리 또는 검색을 통해 발견하세요.",
    },
    {
      icon: Wallet,
      title: "2. 안전 결제",
      description: "안전한 결제 시스템을 통해 원하는 아이디어를 즉시 구매할 수 있습니다.",
    },
    {
      icon: Download,
      title: "3. 즉시 다운로드",
      description: "구매한 디지털 자산은 마이페이지에서 언제든지 다운로드하고 활용할 수 있습니다.",
    },
];

const sellerSteps = [
    {
      icon: Upload,
      title: "1. 상품 등록",
      description: "AI 어시스턴트의 도움을 받아 당신의 지식을 손쉽게 등록하고 판매를 시작하세요.",
    },
    {
      icon: BadgeDollarSign,
      title: "2. 판매 및 알림",
      description: "상품이 판매되면 실시간 알림을 받고, 판매 내역을 대시보드에서 확인하세요.",
    },
    {
      icon: Banknote,
      title: "3. 수익 정산",
      description: "판매 수익을 원하는 방식으로 안전하고 빠르게 정산받을 수 있습니다.",
    },
];


function CategoryCarousel({ category, prompts }: { category: Category, prompts: Prompt[] }) {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const categoryPrompts = prompts.filter(p => p.categorySlug === category.slug);
  
  if (categoryPrompts.length === 0) return null;

  const items = categoryPrompts.length > 5 ? categoryPrompts : [...categoryPrompts, ...categoryPrompts, ...categoryPrompts];

  return (
    <Carousel opts={{ align: "start", loop: true }} plugins={[plugin.current]} onMouseEnter={() => plugin.current.stop()} onMouseLeave={() => plugin.current.reset()} className="w-full">
      <CarouselContent>
        {items.map((prompt, index) => (
          <CarouselItem key={`${prompt.id}-${index}`} className="basis-3/4 sm:basis-1/2 md:basis-1/4">
            <div className="p-1">
              <PromptCard prompt={prompt} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function HomeClient({ prompts, categories }: { prompts: Prompt[], categories: Category[] }) {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const featuredPrompts = prompts.filter(p => p.rank && p.rank > 0).sort((a,b) => (a.rank || 99) - (b.rank || 99));

  const featuredSlides = [
    { title: "실시간 인기 TOP 10", prompts: featuredPrompts },
    { title: "새로 등록된 아이디어", prompts: [...prompts].sort((a,b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime()) },
    { title: "prmart 추천 아이디어", prompts: prompts.filter(p => (p.stats?.likes ?? 0) > 100) },
  ];
  
  const heroSlides = categories.map((category) => ({
    title: category.name,
    headline: {
        "AI & 프로덕션": "누구나 만든 프롬프트가 작품이 되어 거래됩니다.",
        "개발 & IT 자동화": "작은 코드 한 줄도 아이디어 상품이 됩니다.",
        "재테크 & 투자": "투자 인사이트, 누구나 사고팔 수 있습니다.",
        "여행 & 라이프": "당신의 특별한 여행 경험을 공유하고 수익을 만드세요.",
        "생활 & 육아 꿀팁": "일상의 지혜가 소중한 자산이 되는 곳.",
        "비즈니스 & 마케팅": "당신의 전문 지식이 최고의 비즈니스 자산입니다.",
        "창작 & 디자인": "세상을 아름답게 만드는 당신의 재능을 펼치세요.",
        "학습 & 자기계발": "성장을 위한 지식, 여기서 모두 만나보세요.",
        "모빌리티 & 자동차": "스마트한 이동을 위한 모든 정보와 노하우.",
        "라이프 인프라": "더 나은 주거와 생활을 위한 필수 정보.",
    }[category.name] || `${category.name}의 모든 것을 만나보세요.`,
    bgColor: "bg-gradient-to-br from-gray-500 to-gray-600",
    image: `https://picsum.photos/seed/${category.slug}/1600/900`,
    aiHint: category.name,
    slug: category.slug,
  }));


  return (
    <>
        <section>
          <Carousel opts={{ loop: true }} plugins={[plugin.current]} onMouseEnter={() => plugin.current.stop()} onMouseLeave={() => plugin.current.reset()} className="w-full">
            <CarouselContent>
              {heroSlides.map((slide, index) => (
                <CarouselItem key={`${slide.slug}-${index}`}>
                  <Link href={`/c/${slide.slug}`}>
                    <div className="relative h-[30vh] md:h-[35vh] lg:h-[40vh] w-full">
                      <div className={cn("absolute inset-0 w-full h-full", slide.bgColor)}>
                        <Image src={slide.image} alt={slide.title} fill priority={index === 0} className="object-cover opacity-30" data-ai-hint={slide.aiHint} />
                      </div>
                      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center bg-black/40 md:bg-black/50 px-4 text-white">
                        <div className="container flex flex-col items-center justify-center h-full">
                          <div className="text-center space-y-4">
                            <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight text-shadow-lg">{slide.title}</h1>
                            <p className="mt-4 text-lg md:text-xl text-shadow-md">{slide.headline}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />
            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-20 hidden sm:flex" />
          </Carousel>
        </section>

        {/* Search Section */}
        <section className="py-12 md:py-16">
          <div className="container max-w-4xl mx-auto">
            <div className="w-full max-w-2xl mx-auto">
              <div className="relative flex gap-2">
                <div className="relative flex-1">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input placeholder="예: 부동산 임장 리포트, 인스타 광고 템플릿, 미드저니 프롬프트" className="pl-12 h-14 text-lg rounded-full shadow-lg w-full" />
                </div>
                <Button size="lg" className="rounded-full h-14 w-14 p-0">
                  <SearchIcon className="h-6 w-6" />
                  <span className="sr-only">Search</span>
                </Button>
              </div>
            </div>

            <div className="flex justify-center flex-col gap-2 mt-6 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/seller/dashboard">{BUTTONS.START_SELLING}</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/requests">
                  {HEADER_LINKS.REQUEST_IDEA}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="w-full py-12 md:py-20">
            <div className="container px-4 md:px-6">
                 <div className="mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
                  {categories.map((category) => {
                    const Icon = ICONS[category.icon as keyof typeof ICONS] || Wallet;
                    const isHighlighted = category.slug === "ai-and-production" || category.slug === "development-it-automation";
                    return (
                      <Link key={category.slug} href={`/c/${category.slug}`} className="group">
                          <Card className={cn(
                            "flex flex-col items-center justify-center p-6 gap-3 h-[140px] sm:h-[160px] transition-all duration-300 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1",
                            isHighlighted && "border-primary/50 shadow-lg hover:shadow-primary/20"
                          )}>
                              <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                  <Icon className="h-6 w-6" />
                              </div>
                              <span className="font-semibold text-sm text-center">{category.name}</span>
                          </Card>
                      </Link>
                    )
                  })}
              </div>
            </div>
        </section>

        {/* Featured Prompts Section */}
        <section id="featured-prompts" className="w-full py-12 md:py-20 lg:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">지금 뜨는 아이디어</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">prmart 전문가들이 엄선한 인기 상품들을 만나보세요.</p>
            </div>
            
             <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[plugin.current]}
                className="w-full"
            >
                <CarouselContent>
                    {featuredSlides.map((slide, index) => (
                        <CarouselItem key={`${slide.title}-${index}`}>
                            <div className="space-y-4">
                                <h3 className="text-2xl font-bold text-center">{slide.title}</h3>
                                <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {slide.prompts.slice(0, 4).map((prompt) => (
                                        <PromptCard key={prompt.id} prompt={prompt} />
                                    ))}
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 z-10 hidden xl:flex" />
                <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 z-10 hidden xl:flex" />
            </Carousel>
          </div>
        </section>

        {/* Category Rankings Section */}
        <section id="category-rankings" className="w-full py-12 md:py-20 lg:py-24">
            <div className="container space-y-12">
                {categories.map((category) => (
                    <div key={category.slug}>
                        <h3 className="text-2xl md:text-3xl font-bold font-headline tracking-tight mb-6">{category.name} 인기 상품</h3>
                         <CategoryCarousel category={category} prompts={prompts} />
                    </div>
                ))}
            </div>
        </section>


        {/* Trust & Proof Section */}
        <section id="trust-and-proof" className="w-full py-12 md:py-20 lg:py-24 bg-muted/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">신뢰할 수 있는 prmart</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl">수천 명의 크리에이터와 구매자가 prmart와 함께 성장하고 있습니다.</p>
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-muted/30">
                            <CardContent className="p-6">
                                <Quote className="w-8 h-8 text-primary/50 mb-4" />
                                <p className="mb-4 text-foreground/80">"{testimonial.quote}"</p>
                                <div className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} data-ai-hint={testimonial.aiHint} />
                                        <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold">{testimonial.author}</p>
                                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <div className="mt-16 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-primary" />
                        <span className="font-semibold">안전 결제 시스템</span>
                    </div>
                    <span className="text-xl font-light text-border">|</span>
                    <span className="font-semibold">Stripe</span>
                    <span className="font-semibold">Visa</span>
                    <span className="font-semibold">Mastercard</span>
                </div>
            </div>
        </section>

        {/* How-to Section */}
        <section id="how-to" className="w-full py-12 md:py-20 lg:py-24 bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">prmart, 이렇게 이용하세요</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl">단 3단계로 당신의 아이디어를 거래하고 가치를 창출하세요.</p>
                </div>
                <Tabs defaultValue="buyer" className="w-full max-w-4xl mx-auto">
                   <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="buyer">구매자 가이드</TabsTrigger>
                        <TabsTrigger value="seller">판매자 가이드</TabsTrigger>
                    </TabsList>
                  </div>
                  <TabsContent value="buyer" className="pt-8">
                     <div className="mx-auto grid gap-6 md:grid-cols-3">
                        {buyerSteps.map((step) => {
                          const Icon = step.icon;
                          return (
                            <Card key={step.title} className="flex flex-col items-center p-8 text-center bg-muted/50">
                                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                                    <Icon className="h-10 w-10" />
                                </div>
                                <CardTitle className="font-headline mb-2 text-2xl">{step.title}</CardTitle>
                                <CardDescription>{step.description}</CardDescription>
                            </Card>
                        )})}
                    </div>
                  </TabsContent>
                   <TabsContent value="seller" className="pt-8">
                     <div className="mx-auto grid gap-6 md:grid-cols-3">
                        {sellerSteps.map((step) => {
                          const Icon = step.icon;
                          return (
                            <Card key={step.title} className="flex flex-col items-center p-8 text-center bg-muted/50">
                                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                                    <Icon className="h-10 w-10" />
                                </div>
                                <CardTitle className="font-headline mb-2 text-2xl">{step.title}</CardTitle>
                                <CardDescription>{step.description}</CardDescription>
                            </Card>
                        )})}
                    </div>
                  </TabsContent>
                </Tabs>
            </div>
        </section>


        <section className="w-full py-12 md:py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
                당신의 지식을 자산으로 만들 시간
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-lg lg:text-xl">
                지금 바로 판매자로 등록하고 전 세계 사용자들과 당신의 전문성을 공유하세요.
              </p>
            </div>
            <div className="mx-auto w-full flex justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <Link href="/seller/dashboard">{BUTTONS.START_SELLING}</Link>
              </Button>
            </div>
          </div>
        </section>
    </>
  );
}


export default async function HomePage() {
  const [prompts, categories] = await Promise.all([
    getProducts(),
    getCategories()
  ]);

  return (
    <HomeClient prompts={prompts} categories={categories} />
  );
}

    