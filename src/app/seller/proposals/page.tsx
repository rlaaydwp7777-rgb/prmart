
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
    const [requests, setRequests] = React.useState<IdeaRequest[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (user) {
            Promise.all([
                getProposalsByAuthor(user.uid),
                getIdeaRequests() // Fetch all to easily find matches
            ]).then(([userProposals, allRequests]) => {
                setProposals(userProposals);
                setRequests(allRequests);
            }).finally(() => setLoading(false));
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);

    const getRequestForProposal = (requestId: string) => {
        return requests.find(r => r.id === requestId);
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
            <div className="space-y-4">
                {list.map(proposal => {
                    const request = getRequestForProposal(proposal.requestId);
                    if (!request) return null;

                    return (
                        <div key={proposal.id} className="border p-4 rounded-lg flex items-center justify-between">
                            <div>
                                <Link href={`/requests/${request.id}`} className="hover:underline">
                                    <p className="font-semibold">{request.title}</p>
                                </Link>
                                <p className="text-sm text-muted-foreground">{request.category}</p>
                            </div>
                            <Button asChild variant="outline" size="sm">
                                <Link href={`/requests/${request.id}`}>제안 확인</Link>
                            </Button>
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
