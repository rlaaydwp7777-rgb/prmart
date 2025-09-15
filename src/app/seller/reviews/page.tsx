
import { SIDEBAR_STRINGS, SELLER_STRINGS } from "@/lib/string-constants";

export default function SellerReviewsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">{SIDEBAR_STRINGS.REVIEWS}</h1>
      <p className="text-muted-foreground">고객이 남긴 리뷰를 확인하고 관리하세요.</p>
      <div className="border-2 border-dashed rounded-lg p-12 text-center mt-8">
        <p className="text-muted-foreground">⭐ {SELLER_STRINGS.NOTIFICATIONS_WIP}</p>
      </div>
    </div>
  );
}
