
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";

export default function SellerReviewsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>리뷰 관리</CardTitle>
        <CardDescription>
          상품에 달린 구매자 리뷰를 확인하고 답변을 관리합니다. (기능 개발 중)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Star className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            리뷰 관리 기능은 현재 준비 중입니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
