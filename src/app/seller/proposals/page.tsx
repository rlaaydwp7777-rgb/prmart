
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SELLER_STRINGS, SIDEBAR_STRINGS } from "@/lib/string-constants";
import { Lightbulb, Loader2 } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { getProposalsByAuthor, getIdeaRequests } from "@/lib/firebase/services";
import type { Proposal, IdeaRequest } from "@/lib/types";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SellerProposalsPage() {
    const { user, loading: authLoading } = useAuth();
    const [proposals, setProposals] = React.useState<Proposal[]>([]);
    const [requests, setRequests] = React.useState<Map<string, IdeaRequest>>(new Map());
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (user) {
            getProposalsByAuthor(user.uid)
                .then(async (userProposals) => {
                    setProposals(userProposals);
                    if (userProposals.length > 0) {
                        const requestIds = [...new Set(userProposals.map(p => p.requestId))];
                        // Firestore 'in' query can take up to 30 arguments. Chunk if necessary.
                        const allRequests = await getIdeaRequests(requestIds);
                        const requestMap = new Map<string, IdeaRequest>();
                        allRequests.forEach(req => requestMap.set(req.id, req));
                        setRequests(requestMap);
                    }
                })
                .finally(() => setLoading(false));
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    const getRequestForProposal = (requestId: string) => {
        return requests.get(requestId);
    };

    const activeProposals = proposals.filter(p => p.status === 'pending');
    const acceptedProposals = proposals.filter(p => p.status === 'accepted');

    const renderProposalList = (list: Proposal[], emptyMessage: string) => {
        if (list.length === 0) {
            return (
                <div className="border-2 border-dashed rounded-lg p-12 text-center mt-4">
                    <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
                    <p className="mt-4 text-muted-foreground">{emptyMessage}</p>
                </div>
            );
        }

        return (
            <div className="space-y-6">
                {list.map(proposal => {
                    const request = getRequestForProposal(proposal.requestId);
                    // If the original request was deleted, don't render this proposal.
                    if (!request) return null;

                    return (
                        <div key={proposal.id} className="border p-4 rounded-lg space-y-3">
                             <div className="flex items-start justify-between">
                                <div>
                                    <p className="text-sm text-muted-foreground">아이디어 요청:</p>
                                     <Link href={`/requests/${request.id}`} className="hover:underline font-semibold">
                                        <p>{request.title}</p>
                                    </Link>
                                </div>
                                <Button asChild variant="outline" size="sm">
                                    <Link href={`/requests/${request.id}`}>요청 보기</Link>
                                </Button>
                            </div>
                            <div className="p-3 rounded-md bg-muted/50 border">
                               <p className="text-sm text-muted-foreground">내가 남긴 제안:</p>
                               <p className="text-foreground/90">{proposal.content}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    if (loading || authLoading) {
        return (
            <div className="flex h-48 w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>{SIDEBAR_STRINGS.PROPOSALS}</CardTitle>
                <CardDescription>{SELLER_STRINGS.PROPOSALS_DESC}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="active">
                    <TabsList>
                        <TabsTrigger value="active">{SELLER_STRINGS.PROPOSALS_TAB_ACTIVE} ({activeProposals.length})</TabsTrigger>
                        <TabsTrigger value="accepted">{SELLER_STRINGS.PROPOSALS_TAB_ACCEPTED} ({acceptedProposals.length})</TabsTrigger>
                    </TabsList>
                    <TabsContent value="active" className="mt-4">
                        {renderProposalList(activeProposals, SELLER_STRINGS.PROPOSALS_EMPTY_ACTIVE)}
                    </TabsContent>
                    <TabsContent value="accepted" className="mt-4">
                        {renderProposalList(acceptedProposals, SELLER_STRINGS.PROPOSALS_EMPTY_ACCEPTED)}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
