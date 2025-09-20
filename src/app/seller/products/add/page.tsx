import { ProductRegistrationForm } from "@/components/seller/product-registration-form";
import { SELLER_STRINGS } from "@/lib/string-constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Stepper } from "@/components/seller/stepper";


export default function AddProductPage() {
    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold tracking-tight">{SELLER_STRINGS.AI_ASSISTANT_TITLE}</h1>
                <p className="text-muted-foreground">{SELLER_STRINGS.AI_ASSISTANT_DESCRIPTION}</p>
            </div>
            
            <Stepper />
            
            <Card>
                <CardHeader>
                    <CardTitle>{SELLER_STRINGS.STEP_1}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ProductRegistrationForm />
                </CardContent>
            </Card>
        </div>
    )
}
