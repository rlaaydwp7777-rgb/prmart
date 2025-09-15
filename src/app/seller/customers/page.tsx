
import { SIDEBAR_STRINGS, SELLER_STRINGS } from "@/lib/string-constants";

export default function SellerCustomersPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">{SIDEBAR_STRINGS.CUSTOMERS}</h1>
      <p className="text-muted-foreground">내 상품을 구매한 고객 목록을 확인하고 소통하세요.</p>
       <div className="border-2 border-dashed rounded-lg p-12 text-center mt-8">
        <p className="text-muted-foreground">👥 {SELLER_STRINGS.NOTIFICATIONS_WIP}</p>
      </div>
    </div>
  );
}
