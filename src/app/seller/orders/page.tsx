
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/auth-provider";
import { getOrdersByBuyer } from "@/lib/firebase/services";
import { useEffect, useState } from "react";
import type { Order } from "@/lib/types";
import { Loader2 } from "lucide-react";


export default function OrdersPage() {
    const { user, loading: authLoading } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getOrdersByBuyer(user.uid)
                .then(setOrders)
                .finally(() => setLoading(false));
        } else if (!authLoading) {
            setLoading(false);
        }
    }, [user, authLoading]);
    
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
        <CardTitle>{ACCOUNT_STRINGS.ORDERS_TITLE}</CardTitle>
        <CardDescription>{ACCOUNT_STRINGS.ORDERS_DESC}</CardDescription>
      </CardHeader>
      <CardContent>
        {orders.length === 0 ? (
            <div className="text-center py-10">
                <p className="text-muted-foreground">{ACCOUNT_STRINGS.ORDERS_EMPTY}</p>
            </div>
        ) : (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>{ACCOUNT_STRINGS.ORDER_ID}</TableHead>
                <TableHead>{ACCOUNT_STRINGS.ORDER_DATE}</TableHead>
                <TableHead>{ACCOUNT_STRINGS.ORDER_STATUS}</TableHead>
                <TableHead>{ACCOUNT_STRINGS.ORDER_TOTAL}</TableHead>
                <TableHead className="text-right">{ACCOUNT_STRINGS.ORDER_ACTION}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map((order) => (
                <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.substring(0,6).toUpperCase()}</TableCell>
                    <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                    <TableCell>
                    <Badge variant={order.status === 'refunded' ? 'destructive' : 'default'}>
                        {order.status === 'paid' ? ACCOUNT_STRINGS.ORDER_STATUS_PAID : ACCOUNT_STRINGS.ORDER_STATUS_REFUNDED}
                    </Badge>
                    </TableCell>
                    <TableCell>₩{order.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                    <Button asChild variant="outline" size="sm">
                        <Link href={`/seller/orders/${order.id}`}>{ACCOUNT_STRINGS.ORDER_VIEW_DETAILS}</Link>
                    </Button>
                    </TableCell>
                </TableRow>
                ))}
            </TableBody>
            </Table>
        )}
      </CardContent>
    </Card>
  );
}
