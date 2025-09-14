import { PromptCard } from "@/components/prompts/prompt-card";
import { getProducts } from "@/lib/firebase/services";

export default async function BrowsePage() {
  const allPrompts = await getProducts();

  return (
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
  );
}
