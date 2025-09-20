

"use client";

import * as React from "react";
import { Separator } from "@/components/ui/separator";
import { getCategories, getIdeaRequests } from "@/lib/firebase/services";
import { RequestFilters } from "@/components/requests/request-filters";
import { RequestForm } from "@/components/requests/request-form";
import type { Category, IdeaRequest } from "@/lib/types";
import { Loader2 } from "lucide-react";


export default function RequestsPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [ideaRequests, setIdeaRequests] = React.useState<IdeaRequest[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.all([
      getCategories(),
      getIdeaRequests()
    ]).then(([cats, reqs]) => {
      setCategories(cats);
      setIdeaRequests(reqs);
    }).finally(() => setLoading(false));
  }, []);

  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
          아이디어 요청하기
        </h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl">
          찾고 있는 아이디어가 없나요? 필요한 프롬프트, 템플릿, 노하우를 요청하면 prmart의 전문가들이 만들어 드립니다.
        </p>
      </div>

      <RequestForm categories={categories} />

      <Separator className="my-12 md:my-16" />

      {loading ? (
        <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto text-muted-foreground" />
        </div>
      ) : (
        <RequestFilters categories={categories} initialRequests={ideaRequests} />
      )}
    </div>
  );
}
