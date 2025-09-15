
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2 } from "lucide-react";

export default function SellerAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>판매 분석</CardTitle>
        <CardDescription>
          매출, 판매량, 방문자 수 등의 데이터를 분석합니다. (기능 개발 중)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <BarChart2 className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            판매 분석 기능은 현재 준비 중입니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
