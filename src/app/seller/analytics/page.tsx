
"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Package, CreditCard, Users } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Image from "next/image"

const data = [
  { name: "1월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "2월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "3월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "4월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "5월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "6월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "7월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "8월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "9월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "10월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "11월", total: Math.floor(Math.random() * 5000) + 1000 },
  { name: "12월", total: Math.floor(Math.random() * 5000) + 1000 },
]

const recentSales = [
  { id: "1", product: "Next.js 14 Boilerplate", user: "Ken", email: "ken@example.com", amount: "25,000" },
  { id: "2", product: "Minimalist UI Kit", user: "Barbie", email: "barbie@example.com", amount: "35,000" },
  { id: "3", product: "Email Marketing Sequences", user: "Pikachu", email: "pikachu@example.com", amount: "18,000" },
];

const topProducts = [
    { name: "Next.js 14 Boilerplate", sales: 123, image: "https://picsum.photos/400/300?random=1" },
    { name: "Minimalist UI Kit", sales: 98, image: "https://picsum.photos/400/300?random=2" },
    { name: "Email Marketing Sequences", sales: 72, image: "https://picsum.photos/400/300?random=3" },
]

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-6">
      <CardHeader className="p-0">
        <CardTitle>판매 분석</CardTitle>
        <CardDescription>매출, 판매량, 방문자 수 등의 데이터를 분석합니다.</CardDescription>
      </CardHeader>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 매출</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩5,832,900</div>
            <p className="text-xs text-muted-foreground">지난 달 대비 +20.1%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 주문 수</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">지난 달 대비 +180.1%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">평균 주문 가치</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩24,821</div>
            <p className="text-xs text-muted-foreground">지난 달 대비 +12.4%</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">순 방문자</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234명</div>
            <p className="text-xs text-muted-foreground">지난 달 대비 +5.2%</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>월별 개요</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
             <ResponsiveContainer width="100%" height={350}>
              <BarChart data={data}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₩${value / 1000}k`}
                />
                <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>최근 주문</CardTitle>
            <CardDescription>최근 3건의 주문 내역입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
                {recentSales.map((sale) => (
                    <div key={sale.id} className="flex items-center">
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{sale.product}</p>
                            <p className="text-sm text-muted-foreground">{sale.user} ({sale.email})</p>
                        </div>
                        <div className="ml-auto font-medium">+₩{sale.amount}</div>
                    </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
       <Card>
        <CardHeader>
            <CardTitle>인기 상품</CardTitle>
            <CardDescription>가장 많이 판매된 상품 순위입니다.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>상품</TableHead>
                        <TableHead className="text-right">판매량</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {topProducts.map((product) => (
                        <TableRow key={product.name}>
                            <TableCell>
                                <div className="flex items-center gap-4">
                                    <Image src={product.image} alt={product.name} width={64} height={48} className="rounded-md object-cover" data-ai-hint="abstract design" />
                                    <span className="font-medium">{product.name}</span>
                                </div>
                            </TableCell>
                            <TableCell className="text-right">{product.sales.toLocaleString()}개</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
       </Card>

    </div>
  );
}
