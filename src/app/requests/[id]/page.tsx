

import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { User, MessageSquare } from "lucide-react";
import Link from "next/link";
import { getProducts, getIdeaRequest } from "@/lib/firebase/services";
import { Separator } from "@/components/ui/separator";
import { ProposalForm } from "@/components/requests/proposal-form";
import { ProposalList } from "@/components/requests/proposal-list";


export default async function RequestDetailPage({ params }: { params: { id: string } }) {
  const request = await getIdeaRequest(params.id);
  
  if (!request) {
    notFound();
  }

  // This data fetching can be moved to the ProposalList component if it becomes complex
  const products = await getProducts();
  const mockProposals = [
    {
        id: "prop-1",
        requestId: params.id,
        authorId: "user-2",
        authorName: "DevMaster",
        authorAvatar: "https://picsum.photos/100/100?random=1",
        content: "제가 만든 Next.js 보일러플레이트가 딱 맞을 것 같네요! 이걸로 시작하시면 기술 면접 준비 시간을 확 줄일 수 있습니다.",
        productId: products[0]?.id,
        createdAt: new Date().toISOString()
    },
    {
        id: "prop-2",
        requestId: params.id,
        authorId: "user-3",
        authorName: "TechTutor",
        authorAvatar: "https://picsum.photos/100/100?random=5",
        content: "기술 면접 질문만 모아둔 건 아니지만, 제 실전 코딩 테스트 문제 풀이집도 도움이 될 겁니다. 한번 확인해보세요.",
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString()
    }
  ];

  return (
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          {/* Request Details */}
          <div className="space-y-4">
            <div className="flex gap-2">
               {request.category && (
                  <Link href={`/c/${request.categorySlug}`}>
                    <Badge variant="secondary">{request.category}</Badge>
                  </Link>
               )}
              {request.isExample && <Badge variant="outline">예제</Badge>}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tighter">{request.title}</h1>
            
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
              <div className="flex items-center gap-2">
                  <User className="w-4 h-4"/>
                  <span>{request.author}</span>
              </div>
              <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4"/>
                  <span>{request.proposals}개 제안</span>
              </div>
            </div>

            <div className="text-3xl font-bold text-primary">
              희망 예산: {request.budget > 0 ? `₩${request.budget.toLocaleString()}` : "협의 가능"}
            </div>

            <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
              {request.description}
            </p>
          </div>

          <Separator className="my-8 md:my-12" />

          <ProposalForm requestId={params.id} />

          <Separator className="my-8 md:my-12" />
          
          <ProposalList initialProposals={mockProposals} allProducts={products} />

        </div>
      </div>
  );
}
