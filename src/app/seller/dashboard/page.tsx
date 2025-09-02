import { ProductRegistrationForm } from "@/components/seller/product-registration-form";
import { SELLER_DASHBOARD_STRINGS } from "@/lib/string-constants";

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">{SELLER_DASHBOARD_STRINGS.HEADLINE}</h1>
        <p className="text-muted-foreground">{SELLER_DASHBOARD_STRINGS.SUBHEADLINE}</p>
      </div>

      <ProductRegistrationForm />
    </div>
  )
}
