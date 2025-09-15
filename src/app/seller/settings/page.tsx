
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Settings } from "lucide-react";

export default function SellerSettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>판매자 설정</CardTitle>
        <CardDescription>
          판매자 프로필과 정산 정보를 관리합니다. (기능 개발 중)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center text-center py-20">
          <Settings className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">
            설정 기능은 현재 준비 중입니다.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
