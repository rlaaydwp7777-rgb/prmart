import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Search } from "lucide-react";
import { PromptCard } from "@/components/prompts/prompt-card";
import { FEATURED_PROMPTS } from "@/lib/constants";
import { BUTTONS } from "@/lib/string-constants";
import type { HomePageContent } from "@/lib/types";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { CATEGORIES } from "@/lib/constants";

// This is a placeholder function. In a real application, this would fetch data from a CMS or a database like Firestore.
async function getHomePageContent(): Promise<HomePageContent> {
  // In the future, this will be:
  // const doc = await getDoc(doc(db, "siteContent", "home"));
  // return doc.data() as HomePageContent;
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


export default async function Home() {
  const content = await getHomePageContent();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative w-full pt-12 pb-12 md:pt-16 md:pb-20">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-background to-background -z-10"></div>
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center text-center space-y-6">
                <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter whitespace-pre-wrap">
                  {content.headline}
                </h1>
                <p className="max-w-[700px] text-muted-foreground text-lg md:text-xl lg:text-2xl">{content.subheadline}</p>
                <div className="max-w-2xl w-full">
                  <div className="relative">
                    <Input
                      type="search"
                      placeholder="어떤 아이디어를 찾고 계신가요?"
                      className="h-14 pl-12 pr-32 text-lg border-2 border-primary/30 focus-visible:ring-primary/60 w-full rounded-full"
                    />
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                     <Button size="lg" className="absolute right-2 top-1/2 -translate-y-1/2 h-11 rounded-full text-base shrink-0">
                        <Search className="h-5 w-5 md:mr-2"/>
                        <span className="hidden md:inline">검색</span>
                    </Button>
                  </div>
                   <div className="flex justify-center gap-2 mt-4">
                     <Button asChild size="sm" variant="outline">
                        <a href="/seller/dashboard">아이디어 판매하기</a>
                      </Button>
                      <Button asChild size="sm" variant="secondary">
                        <a href="#featured-prompts">아이디어 둘러보기 <ArrowRight className="ml-1 h-5 w-5" /></a>
                      </Button>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* Category Navigation */}
         <section id="categories" className="w-full py-12 md:py-20 lg:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">{content.categoriesHeadline}</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl">{content.categoriesSubheadline}</p>
            </div>
            <div className="mx-auto grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
              {CATEGORIES.map((category) => (
                <Link href="#" key={category.name} className="group">
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

        {/* Curation Section */}
        <section id="featured-prompts" className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">{content.featuredPromptsHeadline}</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">{content.featuredPromptsSubheadline}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {FEATURED_PROMPTS.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
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

    