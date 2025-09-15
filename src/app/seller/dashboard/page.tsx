
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LayoutDashboard } from "lucide-react";

export default function SellerDashboardPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>대시보드</CardTitle>
        <CardDescription>
          판매 현황, 통계, 최근 활동을 요약하여 보여줍니다. (기능 개발 중)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <LayoutDashboard className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            대시보드 기능은 현재 준비 중입니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
