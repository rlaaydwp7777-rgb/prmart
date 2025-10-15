'use client';
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DollarSign, Users, Package, AlertTriangle, PackageCheck } from "lucide-react";
import { getAdminDashboardStatsAction } from "@/app/actions";
import { Skeleton } from "@/components/ui/skeleton";

interface Stat {
  productCount: number;
  pendingCount: number;
  orderCount: number;
  totalRevenue: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = React.useState<Stat | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    async function fetchStats() {
      try {
        const result = await getAdminDashboardStatsAction();
        if (result.error) {
          setError(result.error);
        } else {
          setStats(result);
        }
      } catch (e: any) {
        setError(e.message || "Failed to fetch dashboard stats.");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-20" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-4 w-24 mt-1" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive text-center py-8">{error}</div>;
  }
  
  if (!stats) {
     return <div className="text-muted-foreground text-center py-8">데이터를 불러올 수 없습니다.</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 상품 수</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.productCount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">플랫폼에 등록된 전체 상품</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">승인 대기</CardTitle>
          <AlertTriangle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingCount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">승인이 필요한 상품 수</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 주문 수</CardTitle>
          <PackageCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.orderCount.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">누적된 전체 주문 건수</p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">총 거래액</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">₩{stats.totalRevenue.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">플랫폼 총 누적 거래액</p>
        </CardContent>
      </Card>
    </div>
  );
}
