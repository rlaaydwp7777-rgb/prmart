
import { SIDEBAR_STRINGS, SELLER_STRINGS } from "@/lib/string-constants";

export default function SellerPayoutsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">{SIDEBAR_STRINGS.PAYOUTS}</h1>
      <p className="text-muted-foreground">판매 수익을 정산받고 내역을 관리합니다.</p>
       <div className="border-2 border-dashed rounded-lg p-12 text-center mt-8">
        <p className="text-muted-foreground">💰 {SELLER_STRINGS.NOTIFICATIONS_WIP}</p>
      </div>
    </div>
  );
}
