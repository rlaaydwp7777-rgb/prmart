
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SellerSettingsPage() {
  return (
    <div className="space-y-6">
       <Card>
            <CardHeader>
                <CardTitle>판매자 정보</CardTitle>
                <CardDescription>세금 및 정산에 사용될 판매자 정보를 관리합니다. (이 페이지는 현재 개발 중입니다.)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="seller-name">판매자명</Label>
                    <Input id="seller-name" defaultValue="prmart 판매자" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="account-number">정산 계좌</Label>
                    <Input id="account-number" placeholder="은행 및 계좌번호 입력" />
                </div>
                <Button>정보 저장</Button>
            </CardContent>
       </Card>
    </div>
  )
}
