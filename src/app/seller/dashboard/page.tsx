import { getSellerDashboardData } from "@/lib/firebase/services";
import { Overview } from "@/components/seller/overview";
import { RecentSales } from "@/components/seller/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Package, Star, Users } from "lucide-react";
import { SELLER_STRINGS } from "@/lib/string-constants";
import { BestSellers } from "@/components/seller/best-sellers";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Rocket } from "lucide-react";

export default async function SellerDashboardPage() {
  // In a real app, you'd get the sellerId from the logged-in user session
  const sellerId = "seller-1";
  const { stats, recentSales, bestSellers, salesByMonth } = await getSellerDashboardData(sellerId);

  const hasData = stats.totalSales > 0;

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">대시보드</h2>
      </div>

      {!hasData && (
        <Alert>
          <Rocket className="h-4 w-4" />
          <AlertTitle>{SELLER_STRINGS.DASHBOARD_HEADLINE}</AlertTitle>
          <AlertDescription>
            {SELLER_STRINGS.DASHBOARD_SUBHEADLINE}
          </AlertDescription>
           <Button asChild className="mt-4">
            <Link href="/seller/products/add">{SELLER_STRINGS.ADD_FIRST_PRODUCT}</Link>
          </Button>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {SELLER_STRINGS.STATS_TOTAL_REVENUE}
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₩{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_SALES}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{stats.totalSales.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_TOTAL_PRODUCTS}</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.productCount.toLocaleString()}</div>
             <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{SELLER_STRINGS.STATS_REVIEW_RATING}</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">({stats.reviewCount} {SELLER_STRINGS.NO_REVIEWS_YET})</p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>{SELLER_STRINGS.MONTHLY_OVERVIEW}</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={salesByMonth} />
          </CardContent>
        </Card>
        <Card className="col-span-4 lg:col-span-3">
          <CardHeader>
            <CardTitle>{SELLER_STRINGS.RECENT_ORDERS_TITLE}</CardTitle>
            <CardDescription>
              {SELLER_STRINGS.RECENT_ORDERS_DESC}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <RecentSales sales={recentSales} />
          </CardContent>
        </Card>
         <Card className="col-span-4 lg:col-span-4">
          <CardHeader>
            <CardTitle>{SELLER_STRINGS.BEST_SELLERS_TITLE}</CardTitle>
            <CardDescription>
              {SELLER_STRINGS.BEST_SELLERS_DESC}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BestSellers products={bestSellers} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
