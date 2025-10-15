// src/app/account/orders/page.tsx
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { getOrdersByBuyer } from "@/lib/firebase/services";
import { useAuth } from "@/components/auth/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@/lib/types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getStatusBadgeVariant, getStatusText } from "@/lib/order-helpers";

export default function OrdersPage() {
    const { user } = useAuth();
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchOrders() {
            if (!user) return;
            try {
                const userOrders = await getOrdersByBuyer(user.uid);
                setOrders(userOrders);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [user]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{ACCOUNT_STRINGS.ORDERS_TITLE}</CardTitle>
                <CardDescription>{ACCOUNT_STRINGS.ORDERS_DESC}</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                ) : orders.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{ACCOUNT_STRINGS.ORDER_ID}</TableHead>
                                <TableHead>{ACCOUNT_STRINGS.ORDER_DATE}</TableHead>
                                <TableHead>{ACCOUNT_STRINGS.ORDER_ITEM}</TableHead>
                                <TableHead>{ACCOUNT_STRINGS.ORDER_TOTAL}</TableHead>
                                <TableHead>{ACCOUNT_STRINGS.ORDER_STATUS}</TableHead>
                                <TableHead className="text-right">{ACCOUNT_STRINGS.ORDER_ACTION}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium truncate" style={{maxWidth: '100px'}}>{order.id}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>{order.productTitle}</TableCell>
                                    <TableCell>₩{order.priceGross.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(order.status)}>
                                            {getStatusText(order.status)}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={`/p/${order.productId}`}>{ACCOUNT_STRINGS.ORDER_VIEW_DETAILS}</Link>
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm text-center text-muted-foreground py-8">{ACCOUNT_STRINGS.ORDERS_EMPTY}</p>
                )}
            </CardContent>
        </Card>
    );
}