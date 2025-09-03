import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function SellerLandingPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] p-4 text-center">
      <div className="space-y-4">
        <h1 className="text-5xl md:text-6xl font-bold font-headline tracking-tighter">
          당신의 지식을 자산으로 만드세요
        </h1>
        <p className="max-w-[700px] mx-auto text-muted-foreground text-lg md:text-xl">
          prmart는 당신의 전문성, 노하우, 창의력이 실질적인 수익으로 이어지는 곳입니다. 지금 바로 판매자로 등록하고 전 세계 사용자들과 당신의 가치를 공유하세요.
        </p>
      </div>
      <div className="mt-8">
        <Button asChild size="lg">
          <Link href="/seller/dashboard">
            판매 시작하기
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>

      <div className="mt-20 grid gap-8 md:grid-cols-3 max-w-5xl w-full">
        <Card>
          <CardHeader>
            <CardTitle>간편한 등록</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              AI 어시스턴트의 도움을 받아 몇 분 만에 상품을 등록하고 판매를 시작할 수 있습니다.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>투명한 수익</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              경쟁력 있는 수수료와 상세한 분석 대시보드를 통해 당신의 수익을 투명하게 관리하세요.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>글로벌 마켓</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              전 세계의 잠재 구매자들에게 당신의 디지털 자산을 선보이고 새로운 기회를 만드세요.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
