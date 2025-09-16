import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6">관리자 대시보드</h1>
      <Card>
        <CardHeader>
          <CardTitle>환영합니다!</CardTitle>
          <CardDescription>prmart 운영 관리 페이지입니다.</CardDescription>
        </CardHeader>
        <CardContent>
          <p>여기에서 사용자, 상품, 거래 등 주요 데이터를 관리할 수 있습니다.</p>
          <div className="border-2 border-dashed rounded-lg p-12 text-center mt-8">
            <p className="text-muted-foreground">🚀 핵심 기능들이 곧 추가될 예정입니다.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
