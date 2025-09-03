
import { ProductRegistrationForm } from "@/components/seller/product-registration-form";
import { SELLER_DASHBOARD_STRINGS } from "@/lib/string-constants";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DollarSign, Package, BarChart, Star, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{SELLER_DASHBOARD_STRINGS.HEADLINE}</h1>
        <p className="text-muted-foreground">{SELLER_DASHBOARD_STRINGS.SUBHEADLINE}</p>
      </div>

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
            <CardTitle className="text-sm font-medium">총 판매량</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">지난 달 대비 +180.1%</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">총 상품 수</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12개</div>
            <p className="text-xs text-muted-foreground">이번 달 2개 추가됨</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">리뷰 평점</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.9 / 5.0</div>
            <p className="text-xs text-muted-foreground">총 230개 리뷰</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">AI 판매 도우미</CardTitle>
            <CardDescription>{SELLER_DASHBOARD_STRINGS.AI_ASSISTANT_DESCRIPTION}</CardDescription>
          </CardHeader>
          <CardContent>
             <ProductRegistrationForm />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>최근 주문</CardTitle>
            <CardDescription>최근 5건의 주문 내역입니다.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                   <AvatarImage src="https://picsum.photos/100/100?random=20" alt="Avatar" data-ai-hint="person face" />
                  <AvatarFallback>OM</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Olivia Martin</p>
                  <p className="text-sm text-muted-foreground">
                    olivia.martin@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+₩25,000</div>
              </div>
              <div className="flex items-center">
                <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
                  <AvatarImage src="https://picsum.photos/100/100?random=21" alt="Avatar" data-ai-hint="person face" />
                  <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Jackson Lee</p>
                  <p className="text-sm text-muted-foreground">jackson.lee@email.com</p>
                </div>
                <div className="ml-auto font-medium">+₩35,000</div>
              </div>
              <div className="flex items-center">
                <Avatar className="h-9 w-9">
                   <AvatarImage src="https://picsum.photos/100/100?random=22" alt="Avatar" data-ai-hint="person face" />
                  <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
                  <p className="text-sm text-muted-foreground">
                    isabella.nguyen@email.com
                  </p>
                </div>
                <div className="ml-auto font-medium">+₩18,000</div>
              </div>
               <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://picsum.photos/100/100?random=23" alt="Avatar" data-ai-hint="person face" />
                  <AvatarFallback>WK</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">William Kim</p>
                  <p className="text-sm text-muted-foreground">will@email.com</p>
                </div>
                <div className="ml-auto font-medium">+₩12,000</div>
              </div>
               <div className="flex items-center">
                <Avatar className="h-9 w-9">
                  <AvatarImage src="https://picsum.photos/100/100?random=24" alt="Avatar" data-ai-hint="person face" />
                  <AvatarFallback>SD</AvatarFallback>
                </Avatar>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Sofia Davis</p>
                  <p className="text-sm text-muted-foreground">sofia.davis@email.com</p>
                </div>
                <div className="ml-auto font-medium">+₩25,000</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
