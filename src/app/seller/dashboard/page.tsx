import { ProductRegistrationForm } from "@/components/seller/product-registration-form";

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">판매자 대시보드</h1>
        <p className="text-muted-foreground text-lg">상품을 관리하고 판매 실적을 확인하세요.</p>
      </div>

      <ProductRegistrationForm />
    </div>
  )
}
