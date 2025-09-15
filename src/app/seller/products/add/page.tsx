
import { ProductRegistrationForm } from "@/components/seller/product-registration-form";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SELLER_STRINGS } from "@/lib/string-constants";

export default function AddProductPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{SELLER_STRINGS.ADD_NEW_PRODUCT}</CardTitle>
        <CardDescription>{SELLER_STRINGS.AI_ASSISTANT_DESCRIPTION}</CardDescription>
      </CardHeader>
      <CardContent>
        <ProductRegistrationForm />
      </CardContent>
    </Card>
  );
}
