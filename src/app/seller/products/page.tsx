
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package } from "lucide-react";

export default function SellerProductsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>상품 관리</CardTitle>
        <CardDescription>
          등록된 상품 목록을 확인하고 관리합니다. (기능 개발 중)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Package className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            상품 관리 기능은 현재 준비 중입니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
