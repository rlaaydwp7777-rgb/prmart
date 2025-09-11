
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
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search as SearchIcon, ChevronDown, Wallet, Download, Upload, BadgeDollarSign, Banknote, Quote, ShieldCheck } from "lucide-react";
import { PromptCard } from "@/components/prompts/prompt-card";
import { CATEGORIES, FEATURED_PROMPTS } from "@/lib/constants";
import { BUTTONS, HEADER_LINKS } from "@/lib/string-constants";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { slugify } from "@/lib/utils";

const heroSlides = [
  { title: "AI & 프로덕션", headline: "누구나 만든 프롬프트가 작품이 되어 거래됩니다.", bgColor: "bg-gradient-to-br from-indigo-500 to-purple-600", image: "https://picsum.photos/1600/900?random=31", aiHint: "AI production", slug: slugify("AI & 프로덕션") },
  { title: "개발 & IT 자동화", headline: "작은 코드 한 줄도 아이디어 상품이 됩니다.", bgColor: "bg-gradient-to-br from-slate-800 to-slate-600", image: "https://picsum.photos/1600/900?random=32", aiHint: "development automation", slug: slugify("개발 & IT 자동화") },
  { title: "재테크 & 투자", headline: "투자 인사이트, 누구나 사고팔 수 있습니다.", bgColor: "bg-gradient-to-br from-emerald-500 to-green-600", image: "https://picsum.photos/1600/900?random=33", aiHint: "stock graph", slug: slugify("재테크 & 투자") },
];

const featuredSlides = [
  { title: "실시간 인기 TOP 10", prompts: FEATURED_PROMPTS },
  { title: "새로 등록된 아이디어", prompts: [...FEATURED_PROMPTS].reverse() },
  { title: "prmart 추천 아이디어", prompts: FEATURED_PROMPTS.filter(p => p.rating > 4.8) },
];

const testimonials = [
  {
    quote: "이 템플릿 덕분에 개발 시간이 절반으로 줄었어요! 퀄리티는 말할 것도 없고요. 다음 프로젝트에도 무조건 재구매각입니다.",
    author: "김지훈",
    role: "풀스택 개발자",
    avatar: "https://picsum.photos/100/100?random=10"
  },
  {
    quote: "prmart에서 판매를 시작하고 월급만큼의 부수입을 얻고 있어요. 제 노하우가 다른 사람에게 도움이 된다는 사실이 정말 뿌듯합니다.",
    author: "박서연",
    role: "마케팅 전문가",
    avatar: "https://picsum.photos/100/100?random=11"
  },
  {
    quote: "디자인 리소스 찾느라 시간 낭비할 필요가 없어졌어요. prmart에는 퀄리티 높은 자료가 넘쳐나서 작업 효율이 극대화되었습니다.",
    author: "최민준",
    role: "UI/UX 디자이너",
    avatar: "https://picsum.photos/100/100?random=12"
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


function CategoryCarousel({ category }: { category: typeof CATEGORIES[0] }) {
  const plugin = React.useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const categoryPrompts = FEATURED_PROMPTS.filter(p => p.categorySlug === category.slug);
  
  // To make the carousel loop smoothly, we need enough items.
  const items = categoryPrompts.length > 5 ? categoryPrompts : [...categoryPrompts, ...categoryPrompts, ...categoryPrompts];

  return (
    <Carousel opts={{ align: "start", loop: true }} plugins={[plugin.current]} onMouseEnter={() => plugin.current.stop()} onMouseLeave={() => plugin.current.reset()} className="w-full">
      <CarouselContent>
        {items.map((prompt, index) => (
          <CarouselItem key={`${category.slug}-${prompt.id}-${index}`} className="basis-3/4 sm:basis-1/2 md:basis-1/4">
            <div className="p-1">
              <PromptCard prompt={{...prompt, id: `${prompt.id}-${index}`}} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default function Home() {
  const plugin = React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main>
        <section className="pt-16">
          <Carousel plugins={[plugin.current]} onMouseEnter={() => plugin.current.stop()} onMouseLeave={() => plugin.current.reset()} className="w-full">
            <CarouselContent>
              {heroSlides.map((slide, index) => (
                <CarouselItem key={index}>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-14 rounded-full pl-4 pr-2 text-muted-foreground bg-background">
                      <span className="mr-2">카테고리</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64">
                    {CATEGORIES.map((category) => {
                      const Icon = category.icon;
                      return (
                        <DropdownMenuSub key={category.slug}>
                          <DropdownMenuSubTrigger>
                            <Icon className="mr-2 h-4 w-4" />
                            <span>{category.name}</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              {category.subCategories.map((sub) => (
                                <DropdownMenuItem key={sub.slug} asChild>
                                  <Link href={`/c/${category.slug}/${sub.slug}`}>
                                    {sub.name}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
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
                  {CATEGORIES.map((category) => {
                    const isHighlighted = category.slug === "ai-and-production" || category.slug === "development-it-automation";
                    const Icon = category.icon;
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
                plugins={[React.useRef(Autoplay({ delay: 4000, stopOnInteraction: true })).current]}
                className="w-full"
            >
                <CarouselContent>
                    {featuredSlides.map((slide) => (
                        <CarouselItem key={slide.title}>
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
                {CATEGORIES.map((category) => (
                    <div key={category.slug}>
                        <h3 className="text-2xl md:text-3xl font-bold font-headline tracking-tight mb-6">{category.name} 인기 상품</h3>
                         <CategoryCarousel category={category} />
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
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.author} data-ai-hint="person face" />
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
      </main>
      <Footer />
    </div>
  );
}
