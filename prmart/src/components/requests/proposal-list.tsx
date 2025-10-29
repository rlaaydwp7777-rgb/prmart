// src/components/requests/proposal-list.tsx
"use client";

import type { Proposal, Prompt } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PromptCard } from "@/components/prompts/prompt-card";
import { ThumbsUp, MessageSquare } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

interface ProposalListProps {
    initialProposals: Proposal[];
    allProducts: Prompt[];
}

export function ProposalList({ initialProposals, allProducts }: ProposalListProps) {
  if (initialProposals.length === 0) {
    return (
        <div className="text-center py-12 border-2 border-dashed rounded-lg">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">아직 제안이 없습니다</h3>
            <p className="mt-1 text-sm text-muted-foreground">
                이 요청에 가장 먼저 아이디어를 제안해보세요.
            </p>
        </div>
    )
  }
  
  return (
    <div className="space-y-6">
         <h2 className="text-2xl font-bold font-headline">
            {initialProposals.length}개의 제안
        </h2>
      {initialProposals.map((proposal) => {
        const product = proposal.productId ? allProducts.find(p => p.id === proposal.productId) : undefined;
        return (
          <Card key={proposal.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar>
                        <AvatarImage src={proposal.authorAvatar} alt={proposal.authorName} />
                        <AvatarFallback>{proposal.authorName.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{proposal.authorName}</p>
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(proposal.createdAt), { addSuffix: true, locale: ko })}
                        </p>
                    </div>
                  </div>
                   <Button variant="outline" size="sm">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        채택하기
                    </Button>
              </div>
              <p className="mb-4 text-foreground/80">{proposal.content}</p>
              {product && (
                <div className="max-w-xs">
                    <PromptCard prompt={product} />
                </div>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
