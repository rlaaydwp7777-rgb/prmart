
import { ProductRegistrationForm } from "@/components/seller/product-registration-form";
import { SELLER_DASHBOARD_STRINGS } from "@/lib/string-constants";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { DollarSign, Package, BarChart, Star, Trophy } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const bestSellers = [
    { name: "Next.js 14 Boilerplate", sales: "+1,293", image: "https://picsum.photos/400/300?random=1" },
    { name: "Minimalist UI Kit", sales: "+982", image: "https://picsum.photos/400/300?random=2" },
    { name: "Email Marketing Sequences", sales: "+721", image: "https://picsum.photos/400/300?random=3" },
];

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">당신의 아이디어가 세상과 연결됩니다 🚀</h1>
        <p className="text-muted-foreground">지금 상품을 등록하고 prmart와 함께 성장을 시작해보세요.</p>
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

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">{SELLER_DASHBOARD_STRINGS.AI_ASSISTANT_TITLE}</CardTitle>
                    <CardDescription>{SELLER_DASHBOARD_STRINGS.AI_ASSISTANT_DESCRIPTION}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 text-primary">
                            <Badge className="h-6 w-6 shrink-0 p-0 items-center justify-center">1</Badge>
                            <span className="font-semibold">상품 등록</span>
                        </div>
                        <div className="h-px w-full bg-border"></div>
                        <div className="flex items-center gap-2">
                            <Badge variant="secondary" className="h-6 w-6 shrink-0 p-0 items-center justify-center">2</Badge>
                            <span>검수</span>
                        </div>
                        <div className="h-px w-full bg-border"></div>
                        <div className="flex items-center gap-2">
                             <Badge variant="secondary" className="h-6 w-6 shrink-0 p-0 items-center justify-center">3</Badge>
                            <span>판매 시작</span>
                        </div>
                    </div>
                    <ProductRegistrationForm />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1 space-y-4">
           <Card>
                <CardHeader>
                    <CardTitle>최근 주문</CardTitle>
                    <CardDescription>최근 5건의 주문 내역입니다.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center">
                        <Avatar className="h-9 w-9">
                        <AvatarImage src="https://picsum.photos/100/100?random=20" alt="Avatar" data-ai-hint="person face" />
                        <AvatarFallback>OM</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">Olivia Martin</p>
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
                        </div>
                        <div className="ml-auto font-medium">+₩18,000</div>
                    </div>
                </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>베스트셀러</CardTitle>
                <CardDescription>가장 많이 팔린 상품 TOP 3입니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {bestSellers.map((item, index) => (
                    <div key={item.name} className="flex items-center">
                        <Trophy className={`h-5 w-5 mr-3 ${index === 0 ? 'text-amber-400' : index === 1 ? 'text-slate-400' : 'text-orange-400'}`} />
                        <Avatar className="h-9 w-9">
                            <AvatarImage src={item.image} alt={item.name} data-ai-hint="abstract design"/>
                            <AvatarFallback>{item.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="ml-4 space-y-1">
                            <p className="text-sm font-medium leading-none">{item.name}</p>
                        </div>
                        <div className="ml-auto font-medium">{item.sales}</div>
                    </div>
                ))}
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  )
}
