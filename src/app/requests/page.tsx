

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RequestCard } from "@/components/requests/request-card";
import type { IdeaRequest, Category } from "@/lib/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MainLayout } from "@/components/layout/main-layout";
import { getCategories, getIdeaRequests } from "@/lib/firebase/services";

function RequestFilters({ categories, initialRequests }: { categories: Category[], initialRequests: IdeaRequest[] }) {
    "use client";

    const [selectedCategory, setSelectedCategory] = React.useState("전체보기");

    const filteredRequests = React.useMemo(() => {
        if (selectedCategory === "전체보기") {
            return initialRequests;
        }
        return initialRequests.filter(request => request.category === selectedCategory);
    }, [selectedCategory, initialRequests]);

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
  const [categories, ideaRequests] = await Promise.all([
    getCategories(),
    getIdeaRequests()
  ]);

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

          <RequestFilters categories={categories} initialRequests={ideaRequests} />
        </div>
    </MainLayout>
  );
}
