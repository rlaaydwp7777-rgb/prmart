import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Code, Mail, Palette, Search } from "lucide-react";
import Image from "next/image";
import { PromptCard } from "@/components/prompts/prompt-card";
import { CATEGORIES, FEATURED_PROMPTS } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <section className="relative w-full pt-24 pb-12 md:pt-32 md:pb-20 lg:pt-40 lg:pb-28">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 via-background to-background -z-10"></div>
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  상상이 자산이 되는 곳, <br className="hidden md:block" /> prmart
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Where Imagination Becomes an Asset. 검증된 지식과 경험을 발견하고, 당신의 창의력을 수익으로 전환하세요.
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <a href="#featured-prompts">탐색 시작하기 <ArrowRight className="ml-2 h-5 w-5" /></a>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video flex items-center justify-center">
                 <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4">
                    <div className="absolute w-full h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                 </div>
                 <Image
                  src="https://picsum.photos/800/600"
                  alt="Hero Image"
                  width={800}
                  height={600}
                  className="rounded-xl shadow-2xl object-cover"
                  data-ai-hint="creative technology"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="w-full py-12 md:py-20 lg:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-4xl md:text-5xl">카테고리 쇼케이스</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                개발, 디자인, 마케팅 등 당신에게 필요한 모든 분야의 지식을 찾아보세요.
              </p>
            </div>
            <div className="mx-auto grid grid-cols-2 gap-4 pt-12 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
              {CATEGORIES.map((category) => (
                <a key={category.name} href="#" className="group">
                  <Card className="flex flex-col items-center justify-center p-6 gap-4 h-full transition-all duration-300 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1">
                    <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <category.icon className="h-8 w-8" />
                    </div>
                    <span className="font-semibold text-center">{category.name}</span>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="featured-prompts" className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold font-headline tracking-tighter text-center sm:text-4xl md:text-5xl">추천 상품</h2>
            <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl/relaxed text-center mt-4">
              prmart 전문가들이 엄선한 인기 상품들을 만나보세요.
            </p>
            <div className="grid grid-cols-1 gap-6 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {FEATURED_PROMPTS.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-20 lg:py-24 bg-primary text-primary-foreground">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight">
                당신의 지식을 자산으로 만들 시간
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-xl/relaxed">
                지금 바로 판매자로 등록하고 전 세계 사용자들과 당신의 전문성을 공유하세요.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-x-2">
              <Button asChild size="lg" variant="secondary">
                <a href="/seller/dashboard">판매 시작하기</a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
