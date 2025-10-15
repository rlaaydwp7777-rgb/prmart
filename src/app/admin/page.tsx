// src/app/admin/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Users, Package, AlertTriangle } from "lucide-react";

export default async function AdminDashboardPage() {
  
  // In a real app, you'd fetch this data.
  const kpi = {
    totalRevenue: { value: 5231890, change: 0.201 },
    totalSales: { value: 2350, change: 1.801 },
    totalProducts: { value: 12234, change: 0.19 },
    riskEvents: { value: 12, change: 0.5 },
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            총 매출
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₩{kpi.totalRevenue.value.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
            지난 달 대비 +{(kpi.totalRevenue.change * 100).toFixed(1)}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            총 사용자
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{kpi.totalSales.value.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
              지난 달 대비 +{(kpi.totalSales.change * 100).toFixed(1)}%
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 상품 수</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpi.totalProducts.value.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">
              지난 달 대비 +{(kpi.totalProducts.change * 100).toFixed(1)}%
          </p>
        </CardContent>
      </Card>
        <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">리스크 이벤트</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{kpi.riskEvents.value}건</div>
          <p className="text-xs text-muted-foreground">
              지난 24시간
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
