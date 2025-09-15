
"use client";

import { ProductRegistrationForm } from "@/components/seller/product-registration-form";
import { SELLER_STRINGS } from "@/lib/string-constants";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DollarSign, Package, Star, ShoppingBag } from "lucide-react";
import type { SellerStats, Order, Prompt } from "@/lib/types";
import { getSellerDashboardData } from "@/lib/firebase/services";
import { useAuth } from "@/components/auth/auth-provider";
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { RecentSales } from "@/components/seller/recent-sales";
import Image from "next/image";

interface DashboardData {
    stats: SellerStats;
    recentSales: Order[];
    bestSellers: (Prompt & { sales: number; revenue: number })[];
}

function DashboardSkeleton() {
    return (
        <div className="space-y-8">
             <div>
                <Skeleton className="h-9 w-1/2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
            </div>

             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
                <Skeleton className="h-32 rounded-xl" />
            </div>
            <div className="grid gap-6 grid-cols-1">
                 <Skeleton className="h-96 rounded-xl" />
            </div>
        </div>
    )
}


export default function SellerDashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    const fetchDashboardData = useCallback(async () => {
        if (user) {
            setLoading(true);
            try {
                const dashboardData = await getSellerDashboardData(user.uid);
                setData(dashboardData);
            } catch (error) {
                console.error("Failed to fetch dashboard data:", error);
                setData(null);
            } finally {
                setLoading(false);
            }
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchDashboardData();
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading, fetchDashboardData]);

    if (loading || authLoading) {
        return <DashboardSkeleton />;
    }

    if (!user) {
        return null; // The layout will handle the redirect.
    }
    
    if (!data) {
       return <p>데이터를 불러오는 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</p>;
    }

    const { stats, recentSales, bestSellers } = data;
    const hasProducts = stats.productCount > 0;

    return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{SELLER_STRINGS.DASHBOARD_HEADLINE}</h1>
        <p className="text-muted-foreground">{SELLER_STRINGS.DASHBOARD_SUBHEADLINE}</p>
      </div>

        {!hasProducts ? (
            <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition flex flex-col items-center justify-center p-8 text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">prmart 판매를 시작해보세요!</CardTitle>
                    <CardDescription>당신의 첫 상품을 등록하고 수익 창출의 기회를 만드세요.</CardDescription>
                </CardHeader>
                <CardContent className="w-full max-w-2xl">
                     <ProductRegistrationForm onProductRegistered={fetchDashboardData} />
                </CardContent>
            </Card>
        ) : (
            <>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_REVENUE}</CardTitle>
                            <DollarSign className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Link href="/seller/analytics" className="text-2xl font-bold hover:underline">₩{stats.totalRevenue.toLocaleString()}</Link>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_SALES}</CardTitle>
                            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Link href="/seller/analytics" className="text-2xl font-bold hover:underline">+{stats.totalSales.toLocaleString()}</Link>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_PRODUCTS}</CardTitle>
                            <Package className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                             <Link href="/seller/products" className="text-2xl font-bold hover:underline">{stats.productCount}개</Link>
                        </CardContent>
                    </Card>
                    <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_REVIEW_RATING}</CardTitle>
                            <Star className="h-5 w-5 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {stats.reviewCount > 0 ? (
                                <>
                                    <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)} / 5.0</div>
                                    <p className="text-xs text-muted-foreground">{stats.reviewCount.toLocaleString()}개 리뷰 기준</p>
                                </>
                            ) : (
                                <div className="text-muted-foreground text-sm pt-2">아직 등록된 리뷰가 없습니다.</div>
                            )}
                        </CardContent>
                    </Card>
                </div>
                 <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                    <Card className="lg:col-span-7 shadow-sm rounded-xl hover:bg-muted/5 transition">
                        <CardHeader>
                            <CardTitle className="text-xl">{SELLER_STRINGS.RECENT_ORDERS_TITLE}</CardTitle>
                            <CardDescription>{SELLER_STRINGS.RECENT_ORDERS_DESC}</CardDescription>
                        </CardHeader>
                        <CardContent>
                        {recentSales.length > 0 ? (
                            <RecentSales sales={recentSales} />
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-muted-foreground">{SELLER_STRINGS.EMPTY_ORDER_DATA}</p>
                            </div>
                        )}
                        </CardContent>
                    </Card>
                </div>
                
                 {bestSellers.length > 0 && (
                    <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
                        <CardHeader>
                            <CardTitle className="text-xl">{SELLER_STRINGS.BEST_SELLERS_TITLE}</CardTitle>
                            <CardDescription>{SELLER_STRINGS.BEST_SELLERS_DESC}</CardDescription>
                        </CardHeader>
                        <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {bestSellers.map(product => (
                                <Card key={product.id} className="flex gap-4 p-4 shadow-sm rounded-lg hover:bg-background transition">
                                    <Image src={product.image} alt={product.title} width={80} height={60} className="rounded-md object-cover aspect-video" data-ai-hint={product.aiHint ?? 'abstract design'} />
                                    <div className="space-y-1 text-sm">
                                        <p className="font-semibold line-clamp-2">{product.title}</p>
                                        <p className="text-muted-foreground">{product.sales} 판매</p>
                                    </div>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                )}

                 <Card className="shadow-sm rounded-xl">
                    <CardHeader>
                        <CardTitle className="font-headline text-2xl">새 상품 등록</CardTitle>
                        <CardDescription>AI 어시스턴트를 사용해 빠르고 쉽게 상품을 등록해보세요.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ProductRegistrationForm onProductRegistered={fetchDashboardData} />
                    </CardContent>
                 </Card>
            </>
        )}
      
    </div>
  )
}
