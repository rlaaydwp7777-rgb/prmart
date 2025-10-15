'use client';

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
import { listAllOrdersAction } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@/lib/types";
import Link from "next/link";
import { getStatusBadgeVariant, getStatusText } from "@/lib/order-helpers";

export default function AdminOrdersPage() {
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        async function fetchOrders() {
            try {
                const { orders: allOrders, error } = await listAllOrdersAction();
                if (error) {
                    setError(error);
                } else if (allOrders) {
                   setOrders(allOrders);
                }
            } catch (error: any) {
                console.error("Failed to fetch orders:", error);
                setError(error.message || "주문 내역을 불러오는데 실패했습니다.");
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, []);

    return (
        <Card>
            <CardHeader>
                <CardTitle>전체 주문 내역</CardTitle>
                <CardDescription>플랫폼에서 발생한 모든 거래 내역입니다.</CardDescription>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                        <Skeleton className="h-12 w-full" />
                    </div>
                ) : error ? (
                    <p className="text-destructive text-center py-8">{error}</p>
                ) : orders.length > 0 ? (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>주문번호</TableHead>
                                <TableHead>주문일</TableHead>
                                <TableHead>상품</TableHead>
                                <TableHead>구매자</TableHead>
                                <TableHead>판매자</TableHead>
                                <TableHead>금액</TableHead>
                                <TableHead>상태</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium truncate" style={{maxWidth: '100px'}}>{order.id}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell>
                                        <Link href={`/p/${order.productId}`} className="hover:underline" target="_blank" rel="noopener noreferrer">
                                            {order.productTitle}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{order.buyerId.substring(0,8)}...</TableCell>
                                    <TableCell>{order.sellerId.substring(0,8)}...</TableCell>
                                    <TableCell>₩{order.priceGross.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(order.status)}>
                                            {getStatusText(order.status)}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm text-center text-muted-foreground py-8">아직 주문 내역이 없습니다.</p>
                )}
            </CardContent>
        </Card>
    );
}
