
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompts/prompt-card";
import { FEATURED_PROMPTS } from "@/lib/constants";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const recentOrders = [
  { id: "ORD001", date: "2024-05-20", item: "Next.js 14 Boilerplate", total: "₩25,000", status: "결제완료" },
  { id: "ORD002", date: "2024-05-18", item: "Minimalist UI Kit", total: "₩35,000", status: "결제완료" },
];

export default function AccountDashboardPage() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{ACCOUNT_STRINGS.RECENT_ORDERS}</CardTitle>
          <CardDescription>{ACCOUNT_STRINGS.RECENT_ORDERS_DESC}</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{ACCOUNT_STRINGS.ORDER_ID}</TableHead>
                <TableHead>{ACCOUNT_STRINGS.ORDER_DATE}</TableHead>
                <TableHead>{ACCOUNT_STRINGS.ORDER_ITEM}</TableHead>
                <TableHead>{ACCOUNT_STRINGS.ORDER_TOTAL}</TableHead>
                <TableHead>{ACCOUNT_STRINGS.ORDER_STATUS}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.item}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell><Badge>{order.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <div>
        <h3 className="text-xl font-bold tracking-tight font-headline mb-4">{ACCOUNT_STRINGS.RECOMMENDED_FOR_YOU}</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {FEATURED_PROMPTS.slice(0, 2).map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
        </div>
      </div>
    </div>
  )
}
