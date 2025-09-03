import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PromptCard } from "@/components/prompts/prompt-card";
import { FEATURED_PROMPTS } from "@/lib/constants";

export default async function BrowsePage() {
  // In the future, this would fetch all products, not just featured ones.
  // We'll multiply the featured prompts to simulate a larger catalog for now.
  const allPrompts = [
    ...FEATURED_PROMPTS, 
    ...FEATURED_PROMPTS.map(p => ({...p, id: `${p.id}-2`})), 
    ...FEATURED_PROMPTS.map(p => ({...p, id: `${p.id}-3`}))
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              전체 아이디어 둘러보기
            </h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              prmart의 모든 디지털 자산을 확인하고 당신의 다음 프로젝트에 영감을 더하세요.
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {allPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>

          {/* TODO: Add pagination or infinite scroll */}
        </div>
      </main>
      <Footer />
    </div>
  );
}