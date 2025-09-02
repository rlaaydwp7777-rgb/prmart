import { ProductRegistrationForm } from "@/components/seller/product-registration-form";

export default function SellerDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight font-headline">Seller Dashboard</h1>
        <p className="text-muted-foreground">Manage your products and view your sales performance.</p>
      </div>

      <ProductRegistrationForm />
    </div>
  )
}
