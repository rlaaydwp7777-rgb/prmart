
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PromptCard } from "@/components/prompts/prompt-card";
import type { Proposal, Prompt } from "@/lib/types";

interface ProposalListProps {
    initialProposals: Proposal[];
    allProducts: Prompt[];
}

export function ProposalList({ initialProposals, allProducts }: ProposalListProps) {

    // In a real app, you would fetch proposals for the request ID.
    // For now, we use the initialProposals passed as a prop.
    const proposals = initialProposals;

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold font-headline">현재까지의 제안 ({proposals.length}개)</h2>
            <div className="space-y-6">
                {proposals.map((proposal) => {
                    const product = proposal.productId ? allProducts.find(p => p.id === proposal.productId) : null;
                    return (
                        <div key={proposal.id} className="flex gap-4">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={proposal.authorAvatar} alt={proposal.authorName} data-ai-hint="person face" />
                                <AvatarFallback>{proposal.authorName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 space-y-3">
                                <div className="p-4 rounded-lg bg-muted/50 border">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold">{proposal.authorName}</p>
                                        <p className="text-xs text-muted-foreground">{new Date(proposal.createdAt).toLocaleString()}</p>
                                    </div>
                                    <p className="text-sm text-foreground/90 mt-1">{proposal.content}</p>
                                </div>
                                {product && (
                                    <div className="max-w-sm">
                                        <PromptCard prompt={product} />
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}

                {proposals.length === 0 && (
                    <div className="text-center py-10 text-muted-foreground border-dashed border-2 rounded-lg">
                        아직 등록된 제안이 없습니다.
                    </div>
                )}
            </div>
        </div>
    );
}
