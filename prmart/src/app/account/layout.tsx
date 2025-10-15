// src/app/account/downloads/page.tsx
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
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { getOrdersByBuyer } from "@/lib/firebase/services";
import { useAuth } from "@/components/auth/AuthProvider";
import { Skeleton } from "@/components/ui/skeleton";
import type { Order } from "@/lib/types";

export default function DownloadsPage() {
    const { user } = useAuth();
    const [orders, setOrders] = React.useState<Order[]>([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        async function fetchOrders() {
            if (!user) return;
            try {
                // For downloads, we only care about paid/released orders.
                const userOrders = await getOrdersByBuyer(user.uid);
                setOrders(userOrders.filter(o => o.status === 'paid' || o.status === 'released'));
            } catch (error) {
                console.error("Failed to fetch orders for downloads:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOrders();
    }, [user]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{ACCOUNT_STRINGS.DOWNLOADS_TITLE}</CardTitle>
                <CardDescription>{ACCOUNT_STRINGS.DOWNLOADS_DESC}</CardDescription>
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
                                <TableHead>{ACCOUNT_STRINGS.DOWNLOADS_PRODUCT_NAME}</TableHead>
                                <TableHead>{ACCOUNT_STRINGS.DOWNLOADS_PURCHASE_DATE}</TableHead>
                                <TableHead className="text-right">{ACCOUNT_STRINGS.DOWNLOADS_ACTION}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell className="font-medium">{order.productTitle}</TableCell>
                                    <TableCell>{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm">
                                            <Download className="mr-2 h-4 w-4" />
                                            {ACCOUNT_STRINGS.DOWNLOADS_BUTTON}
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <p className="text-sm text-center text-muted-foreground py-8">{ACCOUNT_STRINGS.DOWNLOADS_EMPTY}</p>
                )}
            </CardContent>
        </Card>
    );
}