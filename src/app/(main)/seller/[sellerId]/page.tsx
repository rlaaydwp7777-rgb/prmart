import { notFound } from "next/navigation";
import { getSellerProfile, getProductsBySeller } from "@/lib/firebase/services";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PromptCard } from "@/components/prompts/prompt-card";

interface SellerPageProps {
  params: {
    sellerId: string;
  };
}

export default async function SellerPage({ params }: SellerPageProps) {
  const { sellerId } = params;
  const [sellerProfile, sellerProducts] = await Promise.all([
    getSellerProfile(sellerId),
    getProductsBySeller(sellerId),
  ]);

  if (!sellerProfile) {
    notFound();
  }

  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 py-10 bg-muted/50 rounded-lg">
        <Avatar className="h-24 w-24 border-4 border-background shadow-lg">
            <AvatarImage src={sellerProfile.photoUrl} alt={sellerProfile.sellerName} data-ai-hint="person face" />
            <AvatarFallback className="text-3xl">{sellerProfile.sellerName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="space-y-1">
            <h1 className="text-3xl font-bold font-headline tracking-tight">{sellerProfile.sellerName}</h1>
            <p className="text-muted-foreground max-w-xl">{sellerProfile.sellerBio || "아직 소개가 없습니다."}</p>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-6">판매 중인 상품 ({sellerProducts.length}개)</h2>
        {sellerProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sellerProducts.map((prompt) => (
              <PromptCard key={prompt.id} prompt={prompt} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed rounded-lg">
            <p className="text-muted-foreground text-lg">아직 판매 중인 상품이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
