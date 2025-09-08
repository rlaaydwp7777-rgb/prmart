import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, User, Send } from "lucide-react";
import type { IdeaRequest } from "@/lib/types";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { PromptCard } from "../prompts/prompt-card";
import { FEATURED_PROMPTS } from "@/lib/constants";
import { Textarea } from "../ui/textarea";

interface RequestCardProps {
  request: IdeaRequest;
}

const mockProposals = [
    {
        author: "DevMaster",
        avatar: "https://picsum.photos/100/100?random=1",
        content: "제가 만든 Next.js 보일러플레이트가 딱 맞을 것 같네요! 이걸로 시작하시면 기술 면접 준비 시간을 확 줄일 수 있습니다.",
        product: FEATURED_PROMPTS[0]
    },
    {
        author: "TechTutor",
        avatar: "https://picsum.photos/100/100?random=5",
        content: "기술 면접 질문만 모아둔 건 아니지만, 제 실전 코딩 테스트 문제 풀이집도 도움이 될 겁니다. 한번 확인해보세요.",
        product: null
    }
]

export function RequestCard({ request }: RequestCardProps) {
  return (
     <Collapsible className="group">
        <div className="flex flex-col h-full">
            <Card className="flex flex-col h-full overflow-hidden transition-all group-data-[state=open]:rounded-b-none hover:shadow-lg duration-300">
                <CardHeader>
                    <Badge variant="secondary" className="w-fit mb-2">{request.category}</Badge>
                    <CollapsibleTrigger asChild>
                        <CardTitle className="text-lg font-headline leading-snug cursor-pointer hover:underline">
                            {request.title}
                        </CardTitle>
                    </CollapsibleTrigger>
                </CardHeader>
                <CardContent className="flex-grow text-sm text-muted-foreground">
                    <p className="line-clamp-3">{request.description}</p>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4 pt-4">
                    <div className="w-full space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <User className="w-4 h-4"/>
                                <span>{request.author}</span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <MessageSquare className="w-4 h-4"/>
                                <span>{request.proposals}개 제안</span>
                            </div>
                        </div>
                        <div className="text-lg font-bold text-primary">
                            ₩{request.budget.toLocaleString()}
                        </div>
                    </div>
                     <CollapsibleTrigger asChild>
                        <Button className="w-full">제안하기</Button>
                    </CollapsibleTrigger>
                </CardFooter>
            </Card>
        </div>
        <CollapsibleContent>
            <div className="p-4 border border-t-0 rounded-b-lg bg-muted/50 space-y-4">
                 <h4 className="font-bold text-md">상품 제안 및 댓글</h4>
                 {/* Existing Proposals */}
                 <div className="space-y-4">
                     {mockProposals.map((proposal, index) => (
                         <div key={index} className="flex gap-3">
                             <Avatar className="h-8 w-8">
                                 <AvatarImage src={proposal.avatar} alt={proposal.author} data-ai-hint="person face" />
                                 <AvatarFallback>{proposal.author.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <div className="flex-1 space-y-2">
                                 <div className="p-3 rounded-lg bg-background border">
                                    <p className="font-semibold text-sm">{proposal.author}</p>
                                    <p className="text-sm text-foreground/80">{proposal.content}</p>
                                 </div>
                                 {proposal.product && (
                                     <div className="max-w-xs">
                                        <PromptCard prompt={proposal.product} />
                                     </div>
                                 )}
                             </div>
                         </div>
                     ))}
                 </div>
                {/* Proposal Submission Form */}
                <div className="flex gap-3 items-start pt-4 border-t">
                    <Avatar className="h-8 w-8">
                         <AvatarImage src="https://picsum.photos/100/100?random=10" alt="current user" data-ai-hint="person face" />
                         <AvatarFallback>ME</AvatarFallback>
                     </Avatar>
                     <div className="flex-1 space-y-2">
                        <Textarea placeholder="여기에 제안 내용이나 댓글을 입력하세요... 자신의 상품을 링크할 수도 있습니다."/>
                        <Button size="sm">
                            <Send className="mr-2 h-4 w-4" />
                            제출하기
                        </Button>
                     </div>
                </div>
            </div>
        </CollapsibleContent>
    </Collapsible>
  );
}
