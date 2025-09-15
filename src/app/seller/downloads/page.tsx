
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, Loader2 } from "lucide-react";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/auth-provider";
import { getOrdersByBuyer } from "@/lib/firebase/services";
import { useEffect, useState } from "react";
import type { Order } from "@/lib/types";

export default function DownloadsPage() {
    const { user, loading: authLoading } = useAuth();
    const [purchasedItems, setPurchasedItems] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            getOrdersByBuyer(user.uid)
                .then(orders => {
                    const paidOrders = orders.filter(o => o.status === 'paid');
                    setPurchasedItems(paidOrders);
                })
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
        <CardTitle>{ACCOUNT_STRINGS.DOWNLOADS_TITLE}</CardTitle>
        <CardDescription>{ACCOUNT_STRINGS.DOWNLOADS_DESC}</CardDescription>
      </CardHeader>
      <CardContent>
        {purchasedItems.length === 0 ? (
            <div className="text-center py-10">
                <p className="text-muted-foreground">{ACCOUNT_STRINGS.DOWNLOADS_EMPTY}</p>
            </div>
        ) : (
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>{ACCOUNT_STRINGS.DOWNLOADS_PRODUCT_NAME}</TableHead>
                <TableHead>{ACCOUNT_STRINGS.DOWNLOADS_PURCHASE_DATE}</TableHead>
                <TableHead className="text-right">{ACCOUNT_STRINGS.DOWNLOADS_ACTION}</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {purchasedItems.map((item) => (
                <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.productTitle}</TableCell>
                    <TableCell>{new Date(item.orderDate).toLocaleDateString()}</TableCell>
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
        )}
      </CardContent>
    </Card>
  );
}
