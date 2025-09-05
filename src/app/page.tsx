

"use client";

import * as React from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Wallet, Download, Bell as BellIcon, Quote, ShieldCheck, Search, ChevronDown, Rocket } from "lucide-react";
import { PromptCard } from "@/components/prompts/prompt-card";
import { CATEGORIES, FEATURED_PROMPTS } from "@/lib/constants";
import { BUTTONS, HEADER_LINKS } from "@/lib/string-constants";
import type { HomePageContent } from "@/lib/types";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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


async function getHomePageContent(): Promise<HomePageContent> {
  return {
    headline: "당신의 아이디어가 자산이 되는 곳, prmart",
    subheadline: "prmart는 검증된 노하우, 템플릿, 그리고 AI 프롬프트를 통해 당신의 아이디어가 실질적인 가치로 전환되는<br/>생태계입니다.",
    categoriesHeadline: "카테고리 쇼케이스",
    categoriesSubheadline: "개발, 디자인, 마케팅 등 당신에게 필요한 모든 분야의 지식을 찾아보세요.",
    featuredPromptsHeadline: "지금 뜨는 아이디어",
    featuredPromptsSubheadline: "prmart 전문가들이 엄선한 인기 상품들을 만나보세요.",
    ctaHeadline: "당신의 지식을 자산으로 만들 시간",
    ctaSubheadline: "지금 바로 판매자로 등록하고 전 세계 사용자들과 당신의 전문성을 공유하세요.",
  };
}

const howToSteps = [
    {
      icon: Upload,
      title: "1. 아이디어 등록",
      description: "당신의 노하우, 템플릿, 프롬프트를 손쉽게 등록하고 판매를 시작하세요.",
    },
    {
      icon: Wallet,
      title: "2. 간편 결제",
      description: "구매자는 안전한 결제 시스템을 통해 원하는 아이디어를 즉시 구매할 수 있습니다.",
    },
    {
      icon: Download,
      title: "3. 즉시 다운로드/사용",
      description: "구매한 디지털 자산은 마이페이지에서 언제든지 다운로드하고 활용할 수 있습니다.",
    },
];

const recentActivities = [
    {
      action: "판매",
      item: "Next.js 14 Boilerplate",
      time: "방금 전",
      user: "DevMaster",
      price: 25000,
    },
    {
      action: "등록",
      item: "Minimalist UI Kit",
      time: "2분 전",
      user: "PixelPerfect",
      price: null,
    },
    {
      action: "판매",
      item: "Email Marketing Sequences",
      time: "5분 전",
      user: "GrowthHacker",
      price: 18000,
    },
    {
        action: "리뷰",
        item: "분기별 주식 투자 리포트",
        time: "10분 전",
        user: "SEOGuru",
        price: null,
    }
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
        Autoplay({ delay: 2000, stopOnInteraction: true })
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
        <section className="relative w-full pt-20 pb-12 md:pt-28 md:pb-16">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-background to-background -z-10"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter whitespace-pre-wrap">
                    {content.headline}
                    </h1>
                    <p 
                      className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl lg:text-2xl"
                      dangerouslySetInnerHTML={{ __html: content.subheadline }}
                    />
                </div>

                <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
          </div>
        </section>
        
        {/* Search & Categories Section */}
        <section id="search-and-categories" className="w-full pb-12 md:pb-20 lg:pb-24">
            <div className="container px-4 md:px-6">
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
                      <Input placeholder="검색" className="pl-12 h-14 text-lg rounded-full shadow-lg w-full" />
                    </div>
                    <Button size="lg" className="rounded-full h-14 w-14 p-0">
                      <Search className="h-6 w-6"/>
                      <span className="sr-only">Search</span>
                    </Button>
                  </div>
                </div>
                 <div className="mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5 pt-8">
                  {CATEGORIES.map((category) => (
                      <Link key={category.name} href={`/c/${encodeURIComponent(category.name.toLowerCase())}`} className="group">
                          <Card className="flex flex-col items-center justify-center p-4 gap-2 h-full transition-all duration-300 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1">
                              <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                  <category.icon className="h-6 w-6" />
                              </div>
                              <span className="font-semibold text-sm text-center">{category.name}</span>
                          </Card>
                      </Link>
                  ))}
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
                <div className="mx-auto grid gap-6 md:grid-cols-3">
                    {howToSteps.map((step) => (
                        <Card key={step.title} className="flex flex-col items-center p-8 text-center bg-muted/50">
                           <div className="p-4 rounded-full bg-primary/10 text-primary mb-4">
                            <step.icon className="h-10 w-10" />
                            </div>
                            <CardTitle className="font-headline mb-2 text-2xl">{step.title}</CardTitle>
                            <CardDescription>{step.description}</CardDescription>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Live Activity Feed Section */}
        <section id="live-feed" className="w-full py-12 md:py-20 lg:py-24 bg-muted/50">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">실시간 prmart</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl">지금 prmart에서는 무슨 일이 일어나고 있을까요?</p>
                </div>
                <Card className="max-w-2xl mx-auto">
                    <CardContent className="p-6 space-y-4">
                        {recentActivities.map((activity, index) => (
                            <div key={index} className="flex items-start gap-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    <BellIcon className="h-5 w-5 text-primary"/>
                                </div>
                                <div className="flex-1">
                                    <div className="font-medium">
                                        <span className="font-bold text-primary">{activity.user}</span>님이 
                                        <span className="font-bold"> {activity.item}</span>을(를) {activity.action}했습니다.
                                        {activity.price && <Badge variant="outline" className="ml-2">₩{activity.price.toLocaleString()}</Badge>}
                                    </div>
                                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
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

    