
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageSquare, User } from "lucide-react";
import type { IdeaRequest } from "@/lib/types";

interface RequestCardProps {
  request: IdeaRequest;
}

export function RequestCard({ request }: RequestCardProps) {

  return (
    <Link href={`/requests/${request.id}`} className="block h-full">
        <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg duration-300">
            <CardHeader>
                <div className="flex gap-2">
                    {request.category && 
                      <Link href={`/c/${request.categorySlug}`} className="z-10">
                        <Badge variant="secondary" className="w-fit">{request.category}</Badge>
                      </Link>
                    }
                    {request.isExample && <Badge variant="outline">예제</Badge>}
                </div>
                <CardTitle className="text-lg font-headline leading-snug group-hover:underline pt-2">
                    {request.title}
                </CardTitle>
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
                        {request.budget > 0 ? `₩${request.budget.toLocaleString()}` : "협의 가능"}
                    </div>
                </div>
                <Button className="w-full">제안하기</Button>
            </CardFooter>
        </Card>
    </Link>
  );
}
