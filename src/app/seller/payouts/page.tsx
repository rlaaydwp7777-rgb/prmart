
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Landmark } from "lucide-react";

export default function SellerPayoutsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>정산 관리</CardTitle>
        <CardDescription>
          판매 수익을 정산받고, 정산 내역을 관리합니다. (기능 개발 중)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Landmark className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            정산 관리 기능은 현재 준비 중입니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
