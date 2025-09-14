
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { RequestCard } from "@/components/requests/request-card";
import type { IdeaRequest, Category } from "@/lib/types";

export function RequestFilters({ categories, initialRequests }: { categories: Category[], initialRequests: IdeaRequest[] }) {
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
                <RequestCard key={request.id} request={request} />
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
