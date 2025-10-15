import { notFound } from "next/navigation";
import { getProduct, getProductsByCategorySlug, getCategories } from "@/lib/firebase/services";
import type { Category } from "@/lib/types";
import { PromptDetailClient } from "@/components/prompts/prompt-detail-client";

export default async function PromptDetailPage({ params }: { params: { id: string } }) {
  
  const fetchedPrompt = await getProduct(params.id);
  
  if (!fetchedPrompt) {
    notFound();
  }

  const [categories, related] = await Promise.all([
      getCategories(),
      getProductsByCategorySlug(fetchedPrompt.categorySlug, 4, fetchedPrompt.id)
  ]);
  
  const categoryData = categories.find(c => c.name === fetchedPrompt.category) || null;

  return <PromptDetailClient prompt={fetchedPrompt} relatedPrompts={related} categoryData={categoryData} />;
}