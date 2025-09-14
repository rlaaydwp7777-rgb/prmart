
"use client";

import { ProductRegistrationForm } from "@/components/seller/product-registration-form";
import { SELLER_STRINGS } from "@/lib/string-constants";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DollarSign, Package, BarChart, Star, Info, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RecentSales } from "@/components/seller/recent-sales";
import { Overview } from "@/components/seller/overview";
import type { SellerStats, Order, Prompt } from "@/lib/types";
import { getSellerDashboardData } from "@/lib/firebase/services";
import { useAuth } from "@/components/auth/auth-provider";
import { useEffect, useState, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import Image from "next/image";

interface DashboardData {
    stats: SellerStats;
    recentSales: Order[];
    bestSellers: (Prompt & { sales: number; revenue: number })[];
    salesByMonth: { name: string; total: number }[];
}

function DashboardSkeleton() {
    return (
        <div className="space-y-6">
             <div>
                <Skeleton className="h-9 w-1/2" />
                <Skeleton className="h-4 w-3/4 mt-2" />
            </div>

             <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
            </div>
            <div className="grid gap-6 grid-cols-1">
                 <Skeleton className="h-96" />
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
            const dashboardData = await getSellerDashboardData(user.uid);
            setData(dashboardData);
            setLoading(false);
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
        return (
            <div className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-2xl font-bold font-headline">인증 오류</h1>
                <p className="text-muted-foreground">판매자 정보를 불러올 수 없습니다. 다시 로그인해주세요.</p>
                <Button asChild className="mt-4">
                    <Link href="/login">로그인</Link>
                </Button>
            </div>
        );
    }
    
    if (!data) {
       return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
    }

    const { stats, recentSales, bestSellers, salesByMonth } = data;
    const hasProducts = stats.productCount > 0;
    const hasSales = stats.totalSales > 0;
    const hasMonthlySales = salesByMonth.some(month => month.total > 0);


  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{SELLER_STRINGS.DASHBOARD_HEADLINE}</h1>
        <p className="text-muted-foreground">{SELLER_STRINGS.DASHBOARD_SUBHEADLINE}</p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_REVENUE}</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩{stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_SALES}</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.totalSales.toLocaleString()}</div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_PRODUCTS}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.productCount}개</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_REVIEW_RATING}</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             {stats.reviewCount > 0 ? (
                <>
                    <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)} / 5.0</div>
                    <p className="text-xs text-muted-foreground">{stats.reviewCount.toLocaleString()}개 리뷰 기준</p>
                </>
             ) : (
                <div className="text-2xl font-bold">-</div>
                
             )}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 grid-cols-1">
          {!hasProducts ? (
             <Card className="flex flex-col items-center justify-center p-8 text-center">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">prmart 판매를 시작해보세요!</CardTitle>
                    <CardDescription>당신의 첫 상품을 등록하고 수익 창출의 기회를 만드세요.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ProductRegistrationForm onProductRegistered={fetchDashboardData} />
                </CardContent>
            </Card>
          ) : (
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{SELLER_STRINGS.AI_ASSISTANT_TITLE}</CardTitle>
                    <CardDescription>{SELLER_STRINGS.AI_ASSISTANT_DESCRIPTION}</CardDescription>
                </CardHeader>
                <CardContent>
                    <ProductRegistrationForm onProductRegistered={fetchDashboardData} />
                </CardContent>
            </Card>
          )}
        
        {hasProducts && (
             <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                  <CardHeader>
                    <CardTitle className="text-xl">{SELLER_STRINGS.MONTHLY_OVERVIEW}</CardTitle>
                    <CardDescription>{SELLER_STRINGS.MONTHLY_OVERVIEW_DESC}</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    {hasMonthlySales ? (
                        <Overview data={salesByMonth} />
                    ) : (
                        <div className="h-[350px] flex items-center justify-center text-center">
                            <p className="text-muted-foreground">{SELLER_STRINGS.EMPTY_SALES_DATA}</p>
                        </div>
                    )}
                  </CardContent>
                </Card>
                <Card className="lg:col-span-3">
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
        )}
        {bestSellers.length > 0 && (
             <Card>
                <CardHeader>
                    <CardTitle className="text-xl">{SELLER_STRINGS.BEST_SELLERS_TITLE}</CardTitle>
                    <CardDescription>{SELLER_STRINGS.BEST_SELLERS_DESC}</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {bestSellers.map(product => (
                        <Card key={product.id} className="flex gap-4 p-4">
                            <Image src={product.image} alt={product.title} width={80} height={60} className="rounded-md object-cover aspect-video" />
                            <div className="space-y-1 text-sm">
                                <p className="font-semibold line-clamp-2">{product.title}</p>
                                <p className="text-muted-foreground">{product.sales} 판매</p>
                            </div>
                        </Card>
                    ))}
                </CardContent>
             </Card>
        )}
      </div>
    </div>
  )
}

    