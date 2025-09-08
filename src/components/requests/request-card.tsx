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
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300">
      <CardHeader>
        <Badge variant="secondary" className="w-fit mb-2">{request.category}</Badge>
        <CardTitle className="text-lg font-headline leading-snug">
          <Link href={`/requests/${request.id}`} className="hover:underline">
            {request.title}
          </Link>
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
                ₩{request.budget.toLocaleString()}
            </div>
        </div>
         <Button asChild className="w-full">
            <Link href={`/requests/${request.id}`}>제안하기</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
