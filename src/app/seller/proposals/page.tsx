
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SELLER_STRINGS, SIDEBAR_STRINGS } from "@/lib/string-constants";
import { Lightbulb } from "lucide-react";

export default function SellerProposalsPage() {

    // Mock data - in a real app, this would be fetched from Firestore
    const activeProposals = [
        { id: 'req-1', title: '유튜브 채널아트 & 썸네일 자동 생성기', category: 'AI & 생산성' },
        { id: 'req-2', title: '부동산 월세 수익률 계산기 (엑셀 템플릿)', category: '재테크 & 투자' },
    ];
    const acceptedProposals:any[] = [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>{SIDEBAR_STRINGS.PROPOSALS}</CardTitle>
                <CardDescription>{SELLER_STRINGS.PROPOSALS_DESC}</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="active">
                    <TabsList>
                        <TabsTrigger value="active">{SELLER_STRINGS.PROPOSALS_TAB_ACTIVE}</TabsTrigger>
                        <TabsTrigger value="accepted">{SELLER_STRINGS.PROPOSALS_TAB_ACCEPTED}</TabsTrigger>
                    </TabsList>
                    <TabsContent value="active" className="mt-4">
                        {activeProposals.length > 0 ? (
                             <div className="space-y-4">
                                {activeProposals.map(req => (
                                    <div key={req.id} className="border p-4 rounded-lg flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold">{req.title}</p>
                                            <p className="text-sm text-muted-foreground">{req.category}</p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">제안 확인</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="border-2 border-dashed rounded-lg p-12 text-center mt-4">
                                <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-muted-foreground">{SELLER_STRINGS.PROPOSALS_EMPTY_ACTIVE}</p>
                             </div>
                        )}
                    </TabsContent>
                    <TabsContent value="accepted" className="mt-4">
                         {acceptedProposals.length > 0 ? (
                             <div className="space-y-4">
                                {/* Map over accepted proposals here */}
                            </div>
                        ) : (
                            <div className="border-2 border-dashed rounded-lg p-12 text-center mt-4">
                                <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
                                <p className="mt-4 text-muted-foreground">{SELLER_STRINGS.PROPOSALS_EMPTY_ACCEPTED}</p>
                             </div>
                        )}
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
