
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";

const orders = [
  { id: "ORD001", date: "2024-05-20", status: ACCOUNT_STRINGS.ORDER_STATUS_PAID, total: "₩25,000" },
  { id: "ORD002", date: "2024-05-18", status: ACCOUNT_STRINGS.ORDER_STATUS_PAID, total: "₩35,000" },
  { id: "ORD003", date: "2024-05-15", status: ACCOUNT_STRINGS.ORDER_STATUS_PAID, total: "₩18,000" },
  { id: "ORD004", date: "2024-05-12", status: ACCOUNT_STRINGS.ORDER_STATUS_REFUNDED, total: "₩12,000" },
];

export default function OrdersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{ACCOUNT_STRINGS.ORDERS_TITLE}</CardTitle>
        <CardDescription>{ACCOUNT_STRINGS.ORDERS_DESC}</CardDescription>
      </CardHeader>
      <CardContent>
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
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell>
                  <Badge variant={order.status === ACCOUNT_STRINGS.ORDER_STATUS_REFUNDED ? 'destructive' : 'default'}>{order.status}</Badge>
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell className="text-right">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/seller/orders/${order.id}`}>{ACCOUNT_STRINGS.ORDER_VIEW_DETAILS}</Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
