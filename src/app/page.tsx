
"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Wallet, Download, Quote, ShieldCheck, Search, ChevronDown, Rocket, BadgeDollarSign, Banknote } from "lucide-react";
import { PromptCard } from "@/components/prompts/prompt-card";
import { CATEGORIES, FEATURED_PROMPTS } from "@/lib/constants";
import { BUTTONS, HEADER_LINKS } from "@/lib/string-constants";
import type { HomePageContent } from "@/lib/types";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";


async function getHomePageContent(): Promise<HomePageContent> {
  return {
    headline: "당신의 아이디어를 금으로 바꿔드립니다. prmart",
    subheadline: null,
    categoriesHeadline: "카테고리 쇼케이스",
    categoriesSubheadline: "개발, 디자인, 마케팅 등 당신에게 필요한 모든 분야의 지식을 찾아보세요.",
    featuredPromptsHeadline: "지금 뜨는 아이디어",
    featuredPromptsSubheadline: "prmart 전문가들이 엄선한 인기 상품들을 만나보세요.",
    ctaHeadline: "당신의 지식을 자산으로 만들 시간",
    ctaSubheadline: "지금 바로 판매자로 등록하고 전 세계 사용자들과 당신의 전문성을 공유하세요.",
  };
}


const heroSlides = [
    {
        category: "AI & 프로덕션",
        title: "한 줄의 프롬프트가 작품이 됩니다.",
        image: "https://picsum.photos/1920/1080?random=50",
        aiHint: "abstract art digital"
    },
    {
        category: "개발 & IT 자동화",
        title: "코드 한 줄이 당신의 비즈니스를 바꿉니다.",
        image: "https://picsum.photos/1920/1080?random=51",
        aiHint: "code terminal"
    },
    {
        category: "재테크 & 투자",
        title: "지식 한 페이지가 수익으로 바뀝니다.",
        image: "https://picsum.photos/1920/1080?random=52",
        aiHint: "stock chart"
    },
    {
        category: "여행 & 라이프",
        title: "당신의 일정표가 누군가의 최고의 여행이 됩니다.",
        image: "https://picsum.photos/1920/1080?random=53",
        aiHint: "beautiful landscape"
    },
];

const buyerSteps = [
    {
      icon: Search,
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

export default function Home() {
    const [content, setContent] = React.useState<HomePageContent | null>(null);
    const plugin = React.useRef(
        Autoplay({ delay: 4000, stopOnInteraction: true })
    );

    React.useEffect(() => {
        getHomePageContent().then(setContent);
    }, []);

    if (!content) {
        return <div></div>; 
    }


  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative w-full text-white">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-[60vh]"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                opts={{ loop: true }}
            >
                <CarouselContent className="h-full">
                    {heroSlides.map((slide) => (
                        <CarouselItem key={slide.category} className="h-full">
                            <div className="h-full w-full bg-cover bg-center"
                                style={{ 
                                    backgroundImage: `url(${slide.image})` 
                                }}
                            >
                                <div className="h-full w-full flex flex-col items-center justify-center bg-black/50">
                                  <div className="container px-4 flex-1 flex flex-col items-center justify-center text-center space-y-8">
                                      <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter whitespace-pre-wrap">
                                          {slide.title}
                                      </h1>
                                  </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                 <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-white bg-white/20 hover:bg-white/30 border-white/50" />
                <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:text-white bg-white/20 hover:bg-white/30 border-white/50" />
            </Carousel>
        </div>
        
        {/* Search Section */}
        <section className="py-12 md:py-16 -mt-24 relative z-10">
          <div className="container">
            <Card className="max-w-4xl mx-auto p-6 shadow-2xl">
               <div className="flex flex-col items-center justify-center space-y-4 text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
                  {content.headline}
                </h1>
              </div>
              <div className="w-full max-w-2xl mx-auto">
                <div className="relative flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="h-14 rounded-full pl-4 pr-2 text-muted-foreground">
                        <span className="mr-2">카테고리</span>
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64">
                        {CATEGORIES.map((category) => (
                          <DropdownMenuSub key={category.name}>
                            <DropdownMenuSubTrigger>
                              <category.icon className="mr-2 h-4 w-4" />
                              <span>{category.name}</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                              <DropdownMenuSubContent>
                                {category.subCategories.map((sub) => (
                                    <DropdownMenuItem key={sub.name} asChild>
                                        <Link href={`/c/${encodeURIComponent(category.name.toLowerCase())}/${encodeURIComponent(sub.name.toLowerCase())}`}>
                                            {sub.name}
                                        </Link>
                                    </DropdownMenuItem>
                                ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input placeholder="예: 부동산 임장 리포트, 인스타 광고 템플릿, 미드저니 프롬프트" className="pl-12 h-14 text-lg rounded-full shadow-lg w-full" />
                  </div>
                  <Button size="lg" className="rounded-full h-14 w-14 p-0">
                    <Search className="h-6 w-6"/>
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
            </Card>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="w-full py-12 md:py-20">
            <div className="container px-4 md:px-6">
                 <div className="mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
                  {CATEGORIES.map((category) => {
                    const isHighlighted = category.name === "AI & 프로덕션" || category.name === "개발 & IT 자동화";
                    return (
                      <Link key={category.name} href={`/c/${encodeURIComponent(category.name.toLowerCase())}`} className="group">
                          <Card className={cn(
                            "flex flex-col items-center justify-center p-4 gap-2 h-full transition-all duration-300 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1",
                            isHighlighted && "border-primary/50 shadow-lg hover:shadow-primary/20"
                          )}>
                              <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                  <category.icon className="h-6 w-6" />
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
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">{content.featuredPromptsHeadline}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">{content.featuredPromptsSubheadline}</p>
            </div>
            
            <Tabs defaultValue="popular" className="w-full">
              <div className="flex justify-center">
                <TabsList>
                  <TabsTrigger value="popular">실시간 인기 TOP 10</TabsTrigger>
                  <TabsTrigger value="new">새로 등록된 아이디어</TabsTrigger>
                  <TabsTrigger value="recommended">prmart 추천 아이디어</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="popular">
                <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {FEATURED_PROMPTS.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="new">
                 <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {/* TODO: Implement new prompts fetching */}
                  {FEATURED_PROMPTS.slice().reverse().map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="recommended">
                 <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {/* TODO: Implement recommended prompts fetching */}
                  {FEATURED_PROMPTS.filter(p => p.rating > 4.8).map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Category Rankings Section */}
        <section id="category-rankings" className="w-full py-12 md:py-20 lg:py-24">
            <div className="container space-y-12">
                {CATEGORIES.map((category) => (
                    <div key={category.name}>
                        <h3 className="text-2xl md:text-3xl font-bold font-headline tracking-tight mb-6">{category.name} 인기 상품</h3>
                        <Carousel
                            opts={{
                                align: "start",
                                loop: true,
                            }}
                             plugins={[plugin.current]}
                             onMouseEnter={plugin.current.stop}
                             onMouseLeave={plugin.current.reset}
                            className="w-full"
                        >
                            <CarouselContent>
                                {FEATURED_PROMPTS.concat(FEATURED_PROMPTS).map((prompt, index) => (
                                    <CarouselItem key={`${category.name}-${prompt.id}-${index}`} className="md:basis-1/3 lg:basis-1/5">
                                         <div className="p-1">
                                            <PromptCard prompt={{...prompt, id: `${prompt.id}-${index}`}} />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
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
                        {buyerSteps.map((step) => (
                            <Card key={step.title} className="flex flex-col items-center p-8 text-center bg-muted/50">
                                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                                    <step.icon className="h-10 w-10" />
                                </div>
                                <CardTitle className="font-headline mb-2 text-2xl">{step.title}</CardTitle>
                                <CardDescription>{step.description}</CardDescription>
                            </Card>
                        ))}
                    </div>
                  </TabsContent>
                   <TabsContent value="seller" className="pt-8">
                     <div className="mx-auto grid gap-6 md:grid-cols-3">
                        {sellerSteps.map((step) => (
                            <Card key={step.title} className="flex flex-col items-center p-8 text-center bg-muted/50">
                                <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                                    <step.icon className="h-10 w-10" />
                                </div>
                                <CardTitle className="font-headline mb-2 text-2xl">{step.title}</CardTitle>
                                <CardDescription>{step.description}</CardDescription>
                            </Card>
                        ))}
                    </div>
                  </TabsContent>
                </Tabs>
            </div>
        </section>


        <section className="w-full py-12 md:py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-4xl md:text-5xl font-bold font-headline tracking-tighter">
                {content.ctaHeadline}
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-lg lg:text-xl">
                {content.ctaSubheadline}
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-x-2">
              <Button asChild size="lg" variant="secondary" className="text-lg">
                <a href="/seller/dashboard">{BUTTONS.START_SELLING}</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
