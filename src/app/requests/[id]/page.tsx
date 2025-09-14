
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { User, MessageSquare, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PromptCard } from "@/components/prompts/prompt-card";
import { Separator } from "@/components/ui/separator";
import { MainLayout } from "@/components/layout/main-layout";
import Link from "next/link";
import { getProducts, getIdeaRequest } from "@/lib/firebase/services";


export default async function RequestDetailPage({ params }: { params: { id: string } }) {
  const request = await getIdeaRequest(params.id);
  
  if (!request) {
    notFound();
  }

  const products = await getProducts();

  const mockProposals = [
    {
        id: "prop-1",
        author: "DevMaster",
        avatar: "https://picsum.photos/100/100?random=1",
        content: "제가 만든 Next.js 보일러플레이트가 딱 맞을 것 같네요! 이걸로 시작하시면 기술 면접 준비 시간을 확 줄일 수 있습니다.",
        product: products[0]
    },
    {
        id: "prop-2",
        author: "TechTutor",
        avatar: "https://picsum.photos/100/100?random=5",
        content: "기술 면접 질문만 모아둔 건 아니지만, 제 실전 코딩 테스트 문제 풀이집도 도움이 될 겁니다. 한번 확인해보세요.",
        product: null
    }
  ];

  return (
    <MainLayout>
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

            {/* Proposal Submission Form */}
            <div className="space-y-6">
                <h2 className="text-2xl font-bold font-headline">아이디어 제안하기</h2>
                 <div className="flex gap-4 items-start">
                    <Avatar className="h-10 w-10">
                         <AvatarImage src="https://picsum.photos/100/100?random=10" alt="current user" data-ai-hint="person face" />
                         <AvatarFallback>ME</AvatarFallback>
                     </Avatar>
                     <div className="flex-1 space-y-2">
                        <Textarea placeholder="여기에 제안 내용이나 댓글을 입력하세요... 자신의 상품을 링크할 수도 있습니다." className="min-h-[100px]"/>
                        <div className="flex justify-between items-center">
                            <Button>
                                <Send className="mr-2 h-4 w-4" />
                                제안 제출
                            </Button>
                            <p className="text-sm text-muted-foreground">상품을 첨부하려면 URL을 붙여넣으세요.</p>
                        </div>
                     </div>
                </div>
            </div>

            <Separator className="my-8 md:my-12" />

            {/* Existing Proposals */}
            <div className="space-y-8">
                 <h2 className="text-2xl font-bold font-headline">현재까지의 제안 ({mockProposals.length}개)</h2>
                 <div className="space-y-6">
                     {mockProposals.map((proposal) => (
                         <div key={proposal.id} className="flex gap-4">
                             <Avatar className="h-10 w-10">
                                 <AvatarImage src={proposal.avatar} alt={proposal.author} data-ai-hint="person face" />
                                 <AvatarFallback>{proposal.author.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div className="flex-1 space-y-3">
                                 <div className="p-4 rounded-lg bg-muted/50 border">
                                    <p className="font-semibold">{proposal.author}</p>
                                    <p className="text-sm text-foreground/90 mt-1">{proposal.content}</p>
                                 </div>
                                 {proposal.product && (
                                     <div className="max-w-sm">
                                        <PromptCard prompt={proposal.product} />
                                     </div>
                                 )}
                             </div>
                         </div>
                     ))}
                 </div>
            </div>
          </div>
        </div>
    </MainLayout>
  );
}
