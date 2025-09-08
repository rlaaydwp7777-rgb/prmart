import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PromptCard } from "@/components/prompts/prompt-card";
import { FEATURED_PROMPTS } from "@/lib/constants";
import { Separator } from "@/components/ui/separator";

export default async function RequestsPage() {
  // These would be fetched from a database based on a specific request in a real app
  const suggestedPrompts = FEATURED_PROMPTS.slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1 pt-24 pb-12">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              아이디어 요청하기
            </h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              찾고 있는 아이디어가 없나요? 필요한 프롬프트, 템플릿, 노하우를 요청하면 prmart의 전문가들이 만들어 드립니다.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6">
            <div className="space-y-2">
                <Input placeholder="요청 제목 (예: 인스타그램 릴스 제작용 영상 편집 템플릿)" className="text-lg h-12" />
            </div>
            <div className="space-y-2">
                 <Textarea placeholder="필요한 아이디어에 대해 자세히 설명해주세요. (예: 숏폼 영상에 바로 적용할 수 있는 트렌디한 자막과 효과가 포함된 CapCut 템플릿이 필요합니다.)" className="min-h-[150px] text-base"/>
            </div>
            <Button size="lg" className="w-full">
              아이디어 등록하기
            </Button>
          </div>

          <Separator className="my-12 md:my-16" />

          <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline tracking-tight">다른 사용자들의 요청</h2>
                <p className="text-muted-foreground mt-2">이런 아이디어들은 어떠세요? 마음에 드는 상품을 제안해보세요.</p>
            </div>
            {/* This section would dynamically show different requests */}
            <div>
                <h3 className="font-bold text-xl mb-2">"유튜브 채널아트 & 썸네일 자동 생성기"</h3>
                <p className="text-muted-foreground mb-4">
                    채널 컨셉과 영상 제목만 입력하면 알아서 세련된 채널아트와 썸네일을 여러 개 만들어주는 AI 프롬프트를 원해요. 포토샵 없이도 고퀄리티 디자인이 가능하면 좋겠습니다.
                </p>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {suggestedPrompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
                 <div className="mt-6 flex flex-col items-center">
                    <Textarea placeholder="내 상품을 제안하는 댓글을 작성하세요..." className="max-w-xl mb-2"/>
                    <Button variant="outline">댓글로 제안하기</Button>
                </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
