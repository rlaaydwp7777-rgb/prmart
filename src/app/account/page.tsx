// src/app/account/page.tsx
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PromptCard } from "@/components/prompts/prompt-card";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { getProducts, getOrdersByBuyer } from "@/lib/firebase/services";
import { useAuth } from "@/components/auth/AuthProvider";
import React, { useEffect, useState } from "react";
import type { Prompt, Order } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";

export default function AccountDashboardPage() {
    const { user } = useAuth();
    const [recommended, setRecommended] = useState<Prompt[]>([]);
    const [recentOrders, setRecentOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            if (!user) return;
            try {
                const [products, orders] = await Promise.all([
                    getProducts(),
                    getOrdersByBuyer(user.uid)
                ]);
                // Simple recommendation: pick some from first category
                setRecommended(products.filter(p => p.categorySlug === 'ai-and-production').slice(0, 2));
                setRecentOrders(orders.slice(0, 2));
            } catch(error) {
                console.error("Failed to fetch account dashboard data", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [user]);

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>{ACCOUNT_STRINGS.DASHBOARD_RECENT_ORDERS}</CardTitle>
                    <CardDescription>{ACCOUNT_STRINGS.DASHBOARD_RECENT_ORDERS_DESC}</CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="space-y-4">
                            <Skeleton className="h-12 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </div>
                    ) : recentOrders.length > 0 ? (
                        <div className="space-y-4">
                            {recentOrders.map(order => (
                                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                                    <div>
                                        <p className="font-medium">{order.productTitle}</p>
                                        <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                                    </div>
                                    <p className="font-semibold">₩{order.priceGross.toLocaleString()}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                         <p className="text-sm text-muted-foreground">{ACCOUNT_STRINGS.ORDERS_EMPTY}</p>
                    )}
                    <Button variant="link" asChild className="p-0 mt-4">
                        <Link href="/account/orders">
                            {ACCOUNT_STRINGS.NAV_ORDERS} 보기 <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>{ACCOUNT_STRINGS.DASHBOARD_RECOMMENDED}</CardTitle>
                </CardHeader>
                <CardContent>
                     {loading ? (
                         <div className="grid sm:grid-cols-2 gap-6">
                            <Skeleton className="h-80 w-full" />
                            <Skeleton className="h-80 w-full" />
                         </div>
                     ) : (
                        <div className="grid sm:grid-cols-2 gap-6">
                            {recommended.map(prompt => (
                                <PromptCard key={prompt.id} prompt={prompt} />
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
