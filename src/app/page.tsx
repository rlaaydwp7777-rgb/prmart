import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Search, Download, Upload, Wallet, Bell } from "lucide-react";
import { PromptCard } from "@/components/prompts/prompt-card";
import { CATEGORIES, FEATURED_PROMPTS } from "@/lib/constants";
import { BUTTONS } from "@/lib/string-constants";
import type { HomePageContent } from "@/lib/types";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";


async function getHomePageContent(): Promise<HomePageContent> {
  return {
    headline: "당신의 아이디어가 자산이 되는 곳, prmart",
    subheadline: "prmart는 검증된 노하우, 템플릿, 그리고 AI 프롬프트를 통해 당신의 아이디어가 실질적인 가치로 전환되는 생태계입니다.",
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


export default async function Home() {
  const content = await getHomePageContent();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full pt-20 pb-20 md:pt-28 md:pb-28">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-background to-background -z-10"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center space-y-8">
                <div className="space-y-4">
                    <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter whitespace-pre-wrap">
                    {content.headline}
                    </h1>
                    <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl lg:text-2xl">{content.subheadline}</p>
                </div>

                <div className="w-full max-w-2xl">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input
                        type="search"
                        placeholder="필요한 아이디어를 검색해보세요 (예: 인스타그램 마케팅 템플릿)"
                        className="h-14 w-full rounded-full bg-background/80 border-2 border-primary/20 pl-12 pr-4 text-lg backdrop-blur-sm"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="#featured-prompts">
                      {BUTTONS.START_EXPLORING}
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/seller/dashboard">{BUTTONS.START_SELLING}</Link>
                  </Button>
                </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">{content.categoriesHeadline}</h2>
                  <p className="max-w-[900px] text-muted-foreground md:text-xl">{content.categoriesSubheadline}</p>
              </div>
              <div className="mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
                  {CATEGORIES.map((category) => (
                      <Link key={category.name} href="#" className="group">
                          <Card className="flex flex-col items-center justify-center p-6 gap-4 h-full transition-all duration-300 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1">
                              <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                                  <category.icon className="h-8 w-8" />
                              </div>
                              <span className="font-semibold text-lg text-center">{category.name}</span>
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

        {/* How-to Section */}
        <section id="how-to" className="w-full py-12 md:py-20 lg:py-24">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">prmart, 이렇게 이용하세요</h2>
                    <p className="max-w-[900px] text-muted-foreground md:text-xl">단 3단계로 당신의 아이디어를 거래하고 가치를 창출하세요.</p>
                </div>
                <div className="mx-auto grid gap-6 md:grid-cols-3">
                    {howToSteps.map((step) => (
                        <Card key={step.title} className="flex flex-col items-center p-8 text-center">
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
                                    <Bell className="h-5 w-5 text-primary"/>
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
