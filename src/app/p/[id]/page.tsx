import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FEATURED_PROMPTS } from "@/lib/constants";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROMPT_CARD_STRINGS } from "@/lib/string-constants";

async function getPromptDetails(id: string) {
  const prompt = FEATURED_PROMPTS.find((p) => p.id === id);
  // In a real app, you would fetch this from a database.
  // We'll add more prompts to the search pool to make more products "findable"
  const allPrompts = [
    ...FEATURED_PROMPTS, 
    ...FEATURED_PROMPTS.map(p => ({...p, id: `${p.id}-2`})), 
    ...FEATURED_PROMPTS.map(p => ({...p, id: `${p.id}-3`}))
  ];
  return allPrompts.find((p) => p.id === id);
}

export default async function PromptDetailPage({ params }: { params: { id: string } }) {
  const prompt = await getPromptDetails(params.id);

  if (!prompt) {
    notFound();
  }

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
                width={600}
                height={450}
                className="object-cover w-full h-full rounded-lg shadow-lg"
                data-ai-hint={prompt.aiHint}
              />
              {/* TODO: Add multiple images carousel */}
            </div>

            {/* Right Column: Product Details */}
            <div className="flex flex-col gap-4">
              <div>
                <Badge>{prompt.category}</Badge>
                <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter mt-2">{prompt.title}</h1>
                <p className="text-muted-foreground mt-1">
                  {PROMPT_CARD_STRINGS.BY} <a href="#" className="text-primary hover:underline">{prompt.author}</a>
                </p>
              </div>
               <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                <span className="font-medium">{prompt.rating.toFixed(1)}</span>
                <span className="text-muted-foreground text-sm">({prompt.reviews.toLocaleString()} {PROMPT_CARD_STRINGS.REVIEWS})</span>
              </div>

              <p className="text-foreground/80 leading-relaxed">
                {/* TODO: Use the real product description */}
                이 보일러플레이트는 최신 Next.js 14, TypeScript, Tailwind CSS, 그리고 prmart의 디자인 시스템을 기반으로 구축되었습니다. 
                인증, 데이터베이스 연동, 그리고 서버 컴포넌트의 모범 사례를 포함하여 여러분의 다음 프로젝트를 즉시 시작할 수 있도록 돕습니다.
                AI 기반 기능 통합을 위한 Genkit 설정이 포함되어 있습니다.
              </p>
              
              <div className="text-4xl font-bold font-headline text-primary">
                ₩{prompt.price.toLocaleString()}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                 <Button size="lg" variant="outline">
                    <ShoppingCart className="mr-2"/>
                    장바구니
                 </Button>
                 <Button size="lg">
                    <Zap className="mr-2"/>
                    바로 구매
                 </Button>
              </div>
              
               {/* TODO: Add more details like license, file list, version log */}
            </div>
          </div>

          {/* TODO: Add related products, Q&A, and Reviews sections */}
        </div>
      </main>
      <Footer />
    </div>
  );
}
