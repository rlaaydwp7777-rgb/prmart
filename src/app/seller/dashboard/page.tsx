
"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SELLER_STRINGS } from "@/lib/string-constants"
import { BarChart, BadgeDollarSign, Package, Star, Loader2 } from "lucide-react";
import { getSellerDashboardData } from "@/lib/firebase/services";
import { useAuth } from "@/components/auth/auth-provider";
import { Overview } from "@/components/seller/overview";
import { RecentSales } from "@/components/seller/recent-sales";
import { PromptCard } from "@/components/prompts/prompt-card";
import { useRouter } from "next/navigation";
import type { SellerStats, Order, Prompt } from "@/lib/types";

type DashboardData = {
    stats: SellerStats;
    recentSales: Order[];
    bestSellers: (Prompt & { sales: number; revenue: number; })[];
    salesByMonth: { name: string; total: number; }[];
}

export default function SellerDashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [data, setData] = React.useState<DashboardData | null>(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        if (!authLoading) {
            if (!user) {
                router.push('/login');
            } else {
                getSellerDashboardData(user.uid)
                    .then(setData)
                    .finally(() => setLoading(false));
            }
        }
    }, [user, authLoading, router]);
    
    if (authLoading || loading) {
        return (
            <div className="flex h-[80vh] w-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }
    
    if (!data) {
        return <p>데이터를 불러오는데 실패했습니다.</p>;
    }
    
    const { stats, recentSales, bestSellers, salesByMonth } = data;
    
    return (
        <div className="grid gap-4 md:gap-8">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_REVENUE}</CardTitle>
                    <BadgeDollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">₩{stats.totalRevenue.toLocaleString()}</div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_SALES}</CardTitle>
                    <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">+{stats.totalSales}</div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_PRODUCTS}</CardTitle>
                    <Package className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.productCount}</div>
                </CardContent>
                </Card>
                <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_REVIEW_RATING}</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
                    <p className="text-xs text-muted-foreground">
                        ({stats.reviewCount} {SELLER_STRINGS.REVIEWS.toLowerCase()})
                    </p>
                </CardContent>
                </Card>
            </div>
            <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>{SELLER_STRINGS.MONTHLY_OVERVIEW}</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <Overview data={salesByMonth} />
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>{SELLER_STRINGS.RECENT_ORDERS_TITLE}</CardTitle>
                        <CardDescription>{SELLER_STRINGS.RECENT_ORDERS_DESC}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentSales.length > 0 ? (
                            <RecentSales sales={recentSales} />
                        ) : (
                            <p className="text-sm text-muted-foreground">{SELLER_STRINGS.EMPTY_ORDER_DATA}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
             <div className="grid gap-4 md:gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle>{SELLER_STRINGS.BEST_SELLERS_TITLE}</CardTitle>
                        <CardDescription>{SELLER_STRINGS.BEST_SELLERS_DESC}</CardDescription>
                    </CardHeader>
                    <CardContent>
                         {bestSellers.length > 0 ? (
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {bestSellers.map(product => (
                                    <PromptCard key={product.id} prompt={product} />
                                ))}
                            </div>
                        ) : (
                            <p className="text-sm text-muted-foreground">{SELLER_STRINGS.EMPTY_TOP_PRODUCTS_DATA}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
