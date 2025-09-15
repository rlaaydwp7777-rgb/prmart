
import { SELLER_STRINGS } from "@/lib/string-constants";

export default function SellerAnalyticsPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">{SELLER_STRINGS.ANALYTICS_TITLE}</h1>
      <p className="text-muted-foreground">{SELLER_STRINGS.ANALYTICS_DESC}</p>
      <div className="border-2 border-dashed rounded-lg p-12 text-center mt-8">
        <p className="text-muted-foreground">📈 {SELLER_STRINGS.NOTIFICATIONS_WIP}</p>
      </div>
    </div>
  );
}
