

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RequestCard } from "@/components/requests/request-card";
import type { IdeaRequest, Category } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainLayout } from "@/components/layout/main-layout";
import { getCategories } from "@/lib/firebase/services";

const ideaRequests: IdeaRequest[] = [
  {
    id: "req-1",
    title: "유튜브 채널아트 & 썸네일 자동 생성기",
    author: "크리에이터준",
    category: "AI & 프로덕션",
    budget: 0,
    proposals: 5,
    description: "채널 컨셉과 영상 제목만 입력하면 알아서 세련된 채널아트와 썸네일을 여러 개 만들어주는 AI 프롬프트를 원해요. 포토샵 없이도 고퀄리티 디자인이 가능하면 좋겠습니다.",
    isExample: true,
  },
  {
    id: "req-2",
    title: "부동산 월세 수익률 계산기 (엑셀 템플릿)",
    author: "재테크왕",
    category: "재테크 & 투자",
    budget: 0,
    proposals: 12,
    description: "매매가, 보증금, 월세, 대출금리, 보유세 등 기본 정보만 입력하면 연간/월간 수익률, ROI, 현금흐름을 자동으로 계산해주는 엑셀 대시보드가 필요합니다.",
    isExample: true,
  },
  {
    id: "req-3",
    title: "반려동물 건강상태 체크 AI 프롬프트",
    author: "집사일기",
    category: "생활 & 육아 꿀팁",
    budget: 0,
    proposals: 8,
    description: "반려동물의 사진과 사료 종류, 활동량 등 간단한 정보를 입력하면 AI가 건강 상태에 대한 기본적인 조언을 해주는 프롬프트를 구합니다. (주의: 의료적 진단을 대체하는 것이 아님)",
    isExample: true,
  },
  {
    id: "req-4",
    title: "개발자 기술면접 질문 모음 & 답변 가이드",
    author: "취준생",
    category: "개발 & IT 자동화",
    budget: 0,
    proposals: 2,
    description: "Next.js, TypeScript, Node.js 분야의 주요 기술면접 질문과 모범 답변, 관련 CS 지식이 정리된 PDF 또는 노션 템플릿을 요청합니다.",
    isExample: true,
  }
];

function RequestFilters({ categories }: { categories: Category[] }) {
    "use client";

    const [selectedCategory, setSelectedCategory] = React.useState("전체보기");

    const filteredRequests = useMemo(() => {
        if (selectedCategory === "전체보기") {
        return ideaRequests;
        }
        return ideaRequests.filter(request => request.category === selectedCategory);
    }, [selectedCategory]);

    return (
        <div className="space-y-8">
            <div className="text-center">
                <h2 className="text-3xl font-bold font-headline tracking-tight">다른 사용자들의 요청</h2>
                <p className="text-muted-foreground mt-2">이런 아이디어들은 어떠세요? 마음에 드는 요청에 당신의 상품을 제안해보세요.</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
                <Button 
                    onClick={() => setSelectedCategory("전체보기")}
                    variant={selectedCategory === "전체보기" ? "default" : "outline"}
                >
                    전체보기
                </Button>
                {categories.map((category) => (
                    <Button 
                        key={category.name} 
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.name)}
                    >
                        {category.name}
                    </Button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredRequests.map((request) => (
                <RequestCard key={request.id} request={request} categories={categories} />
              ))}
            </div>
             {filteredRequests.length === 0 && (
                <div className="text-center py-10 text-muted-foreground col-span-full">
                    해당 카테고리에 등록된 요청이 없습니다.
                </div>
            )}
        </div>
    )

}


export default async function RequestsPage() {
  const categories = await getCategories();

  return (
    <MainLayout>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              아이디어 요청하기
            </h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              찾고 있는 아이디어가 없나요? 필요한 프롬프트, 템플릿, 노하우를 요청하면 prmart의 전문가들이 만들어 드립니다.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-6 border p-6 sm:p-8 rounded-lg">
             <div className="text-center">
                <h2 className="text-2xl font-bold font-headline tracking-tight">필요한 아이디어를 등록하세요</h2>
                <p className="text-muted-foreground mt-1">판매자들이 당신의 요청을 보고 상품을 제안할 거예요.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                  <label htmlFor="request-title" className="font-medium">요청 제목</label>
                  <Input id="request-title" placeholder="예: 인스타그램 릴스 제작용 템플릿" className="text-base h-11" />
              </div>
               <div className="space-y-2">
                  <label htmlFor="request-category" className="font-medium">카테고리</label>
                   <Select name="category">
                    <SelectTrigger id="request-category" className="text-base h-11">
                      <SelectValue placeholder="카테고리 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.name} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
              </div>
            </div>
             <div className="space-y-2">
                  <label htmlFor="request-price" className="font-medium">희망 가격 (선택 사항)</label>
                  <Input id="request-price" type="number" placeholder="예: 20000" className="text-base h-11" />
              </div>
            <div className="space-y-2">
                 <label htmlFor="request-description" className="font-medium">상세 설명</label>
                 <Textarea id="request-description" placeholder="필요한 아이디어에 대해 자세히 설명해주세요." className="min-h-[120px] text-base"/>
            </div>
            <Button size="lg" className="w-full">
              아이디어 등록하기
            </Button>
          </div>

          <Separator className="my-12 md:my-16" />

          <RequestFilters categories={categories} />
        </div>
    </MainLayout>
  );
}
