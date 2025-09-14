
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { PromptCard } from "@/components/prompts/prompt-card";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getProducts } from "@/lib/firebase/services";

const recentOrders = [
  { id: "ORD001", date: "2024-05-20", item: "Next.js 14 Boilerplate", total: "₩25,000", status: ACCOUNT_STRINGS.ORDER_STATUS_PAID },
  { id: "ORD002", date: "2024-05-18", item: "Minimalist UI Kit", total: "₩35,000", status: ACCOUNT_STRINGS.ORDER_STATUS_PAID },
];

export default async function AccountDashboardPage() {

  const recommendedPrompts = (await getProducts()).slice(0, 2);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{ACCOUNT_STRINGS.DASHBOARD_RECENT_ORDERS}</CardTitle>
          <CardDescription>{ACCOUNT_STRINGS.DASHBOARD_RECENT_ORDERS_DESC}</CardDescription>
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
        <h3 className="text-xl font-bold tracking-tight font-headline mb-4">{ACCOUNT_STRINGS.DASHBOARD_RECOMMENDED}</h3>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {recommendedPrompts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
        </div>
      </div>
    </div>
  )
}
