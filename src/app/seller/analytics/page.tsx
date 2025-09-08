
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SellerAnalyticsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>판매 분석</CardTitle>
        <CardDescription>매출, 판매량, 방문자 수 등의 데이터를 분석합니다. (이 페이지는 현재 개발 중입니다.)</CardDescription>
      </CardHeader>
      <CardContent>
        <p>여기에 판매 데이터 차트와 통계가 표시됩니다.</p>
      </CardContent>
    </Card>
  );
}
