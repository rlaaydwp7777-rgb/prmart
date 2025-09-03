import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Bot, Code, Mail, Palette, Search } from "lucide-react";
import Image from "next/image";
import { PromptCard } from "@/components/prompts/prompt-card";
import { CATEGORIES, FEATURED_PROMPTS } from "@/lib/constants";
import { BUTTONS, HOME_STRINGS } from "@/lib/string-constants";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

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
                <h1 className="font-headline text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter whitespace-pre-wrap">
                  {HOME_STRINGS.HEADLINE_PART_1}
                  <span className="text-primary">{HOME_STRINGS.HEADLINE_PART_2}</span>
                </h1>
                <p className="max-w-[600px] text-muted-foreground text-lg md:text-xl">
                  {HOME_STRINGS.SUBHEADLINE}
                </p>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg" className="text-lg">
                    <a href="#featured-prompts">{BUTTONS.START_EXPLORING} <ArrowRight className="ml-2 h-5 w-5" /></a>
                  </Button>
                </div>
              </div>
              <div className="relative aspect-video flex items-center justify-center">
                 <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4">
                    <div className="absolute w-full h-full bg-gradient-to-b from-primary/20 via-primary/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0s' }}></div>
                    <div className="absolute w-2/3 h-2/3 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-accent/20 via-accent/5 to-transparent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                 </div>
                 <Carousel
                    opts={{
                      align: "start",
                      loop: true,
                    }}
                    className="w-full"
                  >
                    <CarouselContent>
                      <CarouselItem>
                        <Image
                          src="https://picsum.photos/800/600?random=10"
                          alt="Hero Image 1"
                          width={800}
                          height={600}
                          className="rounded-xl shadow-2xl object-cover w-full"
                          data-ai-hint="creative technology"
                        />
                      </CarouselItem>
                      <CarouselItem>
                        <Image
                          src="https://picsum.photos/800/600?random=11"
                          alt="Hero Image 2"
                          width={800}
                          height={600}
                          className="rounded-xl shadow-2xl object-cover w-full"
                          data-ai-hint="digital marketplace"
                        />
                      </CarouselItem>
                      <CarouselItem>
                        <Image
                          src="https://picsum.photos/800/600?random=12"
                          alt="Hero Image 3"
                          width={800}
                          height={600}
                          className="rounded-xl shadow-2xl object-cover w-full"
                          data-ai-hint="ai innovation"
                        />
                      </CarouselItem>
                    </CarouselContent>
                  </Carousel>
              </div>
            </div>
          </div>
        </section>

        <section id="categories" className="w-full py-12 md:py-20 lg:py-24 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline tracking-tighter">{HOME_STRINGS.CATEGORIES_HEADLINE}</h2>
              <p className="max-w-[900px] text-muted-foreground text-lg md:text-xl">
                {HOME_STRINGS.CATEGORIES_SUBHEADLINE}
              </p>
            </div>
            <div className="mx-auto grid grid-cols-2 gap-4 pt-12 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
              {CATEGORIES.map((category) => (
                <a key={category.name} href="#" className="group">
                  <Card className="flex flex-col items-center justify-center p-6 gap-4 h-full transition-all duration-300 hover:bg-primary/5 hover:shadow-lg hover:-translate-y-1">
                    <div className="p-3 rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <category.icon className="h-8 w-8" />
                    </div>
                    <span className="font-semibold text-lg text-center">{category.name}</span>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="featured-prompts" className="w-full py-12 md:py-20 lg:py-24">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-headline tracking-tighter text-center">{HOME_STRINGS.FEATURED_PROMPTS_HEADLINE}</h2>
            <p className="mx-auto max-w-[900px] text-muted-foreground md:text-xl text-center mt-4">
              {HOME_STRINGS.FEATURED_PROMPTS_SUBHEADLINE}
            </p>
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
              <h2 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">
                {HOME_STRINGS.CTA_HEADLINE}
              </h2>
              <p className="mx-auto max-w-[600px] text-primary-foreground/80 md:text-lg">
                {HOME_STRINGS.CTA_SUBHEADLINE}
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
