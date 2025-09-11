import { notFound } from "next/navigation";
import { CATEGORIES, FEATURED_PROMPTS } from "@/lib/constants";
import { PromptCard } from "@/components/prompts/prompt-card";
import Link from "next/link";
import { MainLayout } from "@/components/layout/main-layout";
import type { Category, SubCategory } from "@/lib/types";
import { Button } from "@/components/ui/button";

interface Props {
  params: {
    slug?: string[]; // catch-all
  };
}

export default function CategoryCatchAll({ params }: Props) {
  const slugParts = params.slug || [];
  const categorySlug = slugParts[0] ? decodeURIComponent(slugParts[0]) : null;
  const subCategorySlug = slugParts[1] ? decodeURIComponent(slugParts[1]) : null;

  if (!categorySlug) {
    notFound();
  }

  const category = CATEGORIES.find(c => c.slug === categorySlug);
  if (!category) {
    notFound();
  }
  
  let subCategory: SubCategory | undefined;
  if (subCategorySlug) {
      subCategory = category.subCategories.find(sc => sc.slug === subCategorySlug);
      if(!subCategory){
          notFound();
      }
  }

  // In a real app, this would be a more complex database query possibly filtering by subcategory as well.
  // For now, we filter by main category slug.
  const prompts = FEATURED_PROMPTS.filter(p => p.categorySlug === category?.slug);
  
  const pageTitle = subCategory ? subCategory.name : category.name;
  const pageDescription = `${pageTitle} 카테고리의 모든 디지털 자산을 확인하고 당신의 다음 프로젝트에 영감을 더하세요.`;


  return (
    <MainLayout>
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
              {pageTitle}
            </h1>
            <p className="max-w-[900px] text-muted-foreground md:text-xl">
              {pageDescription}
            </p>
          </div>
          
          {prompts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {prompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
                ))}
            </div>
          ) : (
            <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">이 카테고리에는 아직 상품이 없습니다.</p>
                 <Button asChild variant="link" className="mt-4">
                    <Link href="/">홈으로 돌아가기</Link>
                </Button>
            </div>
          )}
        </div>
    </MainLayout>
  );
}
