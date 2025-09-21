// src/app/seller/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ArrowUpRight, DollarSign, Package, ShoppingCart, Users, BarChart } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthProvider';
import { getSellerDashboardData } from '@/lib/firebase/services';
import type { SellerStats, Order, Prompt } from '@/lib/types';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { BarChart as RechartsBarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SELLER_STRINGS } from '@/lib/string-constants';

type DashboardData = {
    stats: SellerStats;
    recentSales: Order[];
    bestSellers: (Prompt & { sales: number; revenue: number; })[];
    salesByMonth: { name: string, total: number }[];
}

export default function SellerDashboardPage() {
    const { user } = useAuth();
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if(user?.uid) {
            getSellerDashboardData(user.uid)
                .then(setData)
                .finally(() => setLoading(false));
        } else if (!user) {
            setLoading(false);
        }
    }, [user]);

    if(loading) {
        return <div>로딩중...</div>
    }

    if (!user) {
        return (
             <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <h1 className="text-2xl font-bold mb-4">로그인이 필요합니다.</h1>
                <p className="text-muted-foreground mb-6">판매자 대시보드에 접근하려면 먼저 로그인해주세요.</p>
                <Button asChild>
                    <Link href="/login?continueUrl=/seller">로그인 페이지로 이동</Link>
                </Button>
            </div>
        )
    }

    if (!data || data.stats.productCount === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-center bg-background rounded-lg p-8">
                <h1 className="text-4xl font-headline font-bold mb-4">{SELLER_STRINGS.DASHBOARD_HEADLINE}</h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">{SELLER_STRINGS.DASHBOARD_SUBHEADLINE}</p>
                <Button asChild size="lg">
                    <Link href="/seller/products/add">{SELLER_STRINGS.ADD_FIRST_PRODUCT}</Link>
                </Button>
            </div>
        )
    }
    
    const { stats, recentSales, bestSellers, salesByMonth } = data;

    return (
        <div className="flex flex-col gap-8">
            <header>
                <h1 className="text-3xl font-bold tracking-tight">대시보드</h1>
                <p className="text-muted-foreground">환영합니다, {user.displayName || user.email}!</p>
            </header>

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
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalSales.toLocaleString()}</div>
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
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)} / 5.0</div>
                        <p className="text-xs text-muted-foreground">
                            {stats.reviewCount > 0 ? `${stats.reviewCount}개의 리뷰 기준` : SELLER_STRINGS.NO_REVIEWS_YET}
                        </p>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="lg:col-span-4">
                     <CardHeader>
                        <CardTitle>{SELLER_STRINGS.MONTHLY_OVERVIEW}</CardTitle>
                        <CardDescription>{SELLER_STRINGS.MONTHLY_OVERVIEW_DESC}</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                         <ResponsiveContainer width="100%" height={350}>
                            <RechartsBarChart data={salesByMonth}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₩${Number(value) / 1000}k`} />
                                <Tooltip 
                                    contentStyle={{ 
                                        backgroundColor: 'hsl(var(--background))', 
                                        borderColor: 'hsl(var(--border))' 
                                    }}
                                    cursor={{fill: 'hsl(var(--muted))'}}
                                />
                                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </RechartsBarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3">
                    <CardHeader>
                        <CardTitle>{SELLER_STRINGS.RECENT_ORDERS_TITLE}</CardTitle>
                        <CardDescription>{SELLER_STRINGS.RECENT_ORDERS_DESC}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {recentSales.length > 0 ? (
                             <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>고객</TableHead>
                                        <TableHead className="text-right">금액</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {recentSales.map((sale) => (
                                        <TableRow key={sale.id}>
                                            <TableCell>
                                                <div className="font-medium">{sale.buyerName}</div>
                                                <div className="text-sm text-muted-foreground">{sale.buyerEmail}</div>
                                            </TableCell>
                                            <TableCell className="text-right">₩{sale.amount.toLocaleString()}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : <p className="text-sm text-muted-foreground">{SELLER_STRINGS.EMPTY_ORDER_DATA}</p>}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{SELLER_STRINGS.BEST_SELLERS_TITLE}</CardTitle>
                    <CardDescription>{SELLER_STRINGS.BEST_SELLERS_DESC}</CardDescription>
                </CardHeader>
                <CardContent>
                    {bestSellers.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {bestSellers.map(product => (
                                <div key={product.id} className="flex items-center gap-4">
                                    <Avatar className="hidden h-12 w-12 sm:flex rounded-md">
                                        <AvatarImage src={product.image} alt={product.title} className="object-cover" />
                                        <AvatarFallback>{product.title.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div className="grid gap-1">
                                        <Link href={`/p/${product.id}`} className="hover:underline">
                                            <p className="text-sm font-medium leading-none">{product.title}</p>
                                        </Link>
                                        <p className="text-sm text-muted-foreground">{product.sales}회 판매 / ₩{product.revenue.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : <p className="text-sm text-muted-foreground">{SELLER_STRINGS.EMPTY_TOP_PRODUCTS_DATA}</p>}
                </CardContent>
            </Card>
        </div>
    );
}
