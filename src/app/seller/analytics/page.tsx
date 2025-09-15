
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, CreditCard, ShoppingBag, PlusCircle } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"
import { SELLER_STRINGS } from "@/lib/string-constants"
import { useAuth } from "@/components/auth/auth-provider"
import { useState, useEffect, useCallback } from "react"
import { getSellerDashboardData } from "@/lib/firebase/services"
import type { SellerStats, Prompt, Order } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import { RecentSales } from "@/components/seller/recent-sales"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface AnalyticsData {
    stats: SellerStats;
    recentSales: Order[];
    bestSellers: (Prompt & { sales: number; revenue: number })[];
    salesByMonth: { name: string; total: number }[];
}

function AnalyticsSkeleton() {
    return (
         <div className="space-y-8">
            <div className="p-0">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-80 mt-2" />
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
                <Skeleton className="h-28 rounded-xl" />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Skeleton className="lg:col-span-4 h-96 rounded-xl" />
                <Skeleton className="lg:col-span-3 h-96 rounded-xl" />
            </div>
             <Skeleton className="h-96 rounded-xl" />
        </div>
    )
}

export default function SellerAnalyticsPage() {
  const { user, loading: authLoading } = useAuth();
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnalyticsData = useCallback(async () => {
    if (user) {
        setLoading(true);
        const dashboardData = await getSellerDashboardData(user.uid);
        setData(dashboardData);
        setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
        fetchAnalyticsData();
    } else if (!authLoading) {
        setLoading(false);
    }
  }, [user, authLoading, fetchAnalyticsData]);


  if(loading || authLoading) {
    return <AnalyticsSkeleton />
  }

  if(!user) {
    return null; // The layout will handle the redirect
  }
  
  if(!data) {
    return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;
  }

  const { stats, recentSales, bestSellers, salesByMonth } = data;
  const hasMonthlySales = salesByMonth.some(month => month.total > 0);


  return (
    <div className="space-y-8">
        <div className="p-0">
            <h1 className="text-xl md:text-2xl font-bold tracking-tight font-headline">{SELLER_STRINGS.ANALYTICS_TITLE}</h1>
            <p className="text-muted-foreground">{SELLER_STRINGS.ANALYTICS_DESC}</p>
        </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.TOTAL_REVENUE}</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩{stats.totalRevenue.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.TOTAL_ORDERS}</CardTitle>
            <ShoppingBag className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.totalSales.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.AVG_ORDER_VALUE}</CardTitle>
            <CreditCard className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩{stats.totalSales > 0 ? Math.round(stats.totalRevenue / stats.totalSales).toLocaleString() : 0}</div>
          </CardContent>
        </Card>
         <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.TOTAL_PRODUCTS}</CardTitle>
            <Package className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <Link href="/seller/products" className="text-2xl font-bold hover:underline">{stats.productCount}개</Link>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 shadow-sm rounded-xl hover:bg-muted/5 transition">
          <CardHeader>
            <CardTitle className="text-xl">{SELLER_STRINGS.MONTHLY_OVERVIEW}</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {hasMonthlySales ? (
                 <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={salesByMonth}>
                    <XAxis
                      dataKey="name"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₩${value / 1000}k`}
                    />
                    <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
                  </BarChart>
                </ResponsiveContainer>
            ): (
                <div className="h-[350px] flex items-center justify-center text-center">
                    <p className="text-muted-foreground">{SELLER_STRINGS.EMPTY_SALES_DATA}</p>
                </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 shadow-sm rounded-xl hover:bg-muted/5 transition">
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
                     <Button asChild className="mt-4">
                        <Link href="/seller/dashboard">
                            <PlusCircle className="mr-2 h-4 w-4" />
                            {SELLER_STRINGS.ADD_FIRST_PRODUCT}
                        </Link>
                    </Button>
                </div>
            )}
          </CardContent>
        </Card>
      </div>
       <Card className="shadow-sm rounded-xl hover:bg-muted/5 transition">
        <CardHeader>
            <CardTitle className="text-xl">{SELLER_STRINGS.TOP_PRODUCTS}</CardTitle>
            <CardDescription>{SELLER_STRINGS.TOP_PRODUCTS_DESC}</CardDescription>
        </CardHeader>
        <CardContent>
            {bestSellers.length > 0 ? (
                 <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{SELLER_STRINGS.PRODUCT_TABLE_PRODUCT}</TableHead>
                            <TableHead className="text-right">{SELLER_STRINGS.PRODUCT_TABLE_SALES}</TableHead>
                            <TableHead className="text-right">{SELLER_STRINGS.PRODUCT_TABLE_REVENUE}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bestSellers.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        <Image src={product.image} alt={product.title} width={64} height={48} className="rounded-md object-cover" data-ai-hint={product.aiHint ?? 'abstract design'} />
                                        <span className="font-medium">{product.title}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">{product.sales.toLocaleString()}개</TableCell>
                                 <TableCell className="text-right">₩{product.revenue.toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                 <div className="text-center py-10">
                    <p className="text-muted-foreground">{SELLER_STRINGS.EMPTY_TOP_PRODUCTS_DATA}</p>
                </div>
            )}
        </CardContent>
       </Card>

    </div>
  );
}
