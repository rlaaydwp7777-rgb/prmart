import { PromptCard } from "@/components/prompts/prompt-card";
import { CATEGORIES, FEATURED_PROMPTS } from "@/lib/constants";
import { notFound } from "next/navigation";
import { MainLayout } from "@/components/layout/main-layout";
import type { Category, SubCategory } from "@/lib/types";

export default async function CategoryPage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  let category: Category | undefined;
  let subCategory: SubCategory | undefined;
  let pageTitle = "";
  let pageDescription = "";

  if (slug.length === 1) {
    // Main category page: /c/[category-slug]
    category = CATEGORIES.find(c => c.slug === slug[0]);
    if (category) {
      pageTitle = category.name;
      pageDescription = `${category.name} 카테고리의 모든 디지털 자산을 확인하고 당신의 다음 프로젝트에 영감을 더하세요.`;
    }
  } else if (slug.length === 2) {
    // Subcategory page: /c/[category-slug]/[subcategory-slug]
    category = CATEGORIES.find(c => c.slug === slug[0]);
    if (category) {
      subCategory = category.subCategories.find(sc => sc.slug === slug[1]);
      if (subCategory) {
        pageTitle = subCategory.name;
        pageDescription = `${subCategory.name} 서브카테고리의 모든 디지털 자산을 확인하고 당신의 다음 프로젝트에 영감을 더하세요.`;
      }
    }
  }

  if (!category) {
    notFound();
  }

  // Filter prompts by the main category name for simplicity.
  // In a real app, this would be a more complex database query possibly filtering by subcategory as well.
  const categoryPrompts = FEATURED_PROMPTS.filter(p => p.category === category?.name);
  
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
          
          {categoryPrompts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {categoryPrompts.map((prompt) => (
                <PromptCard key={prompt.id} prompt={prompt} />
                ))}
            </div>
          ) : (
            <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">이 카테고리에는 아직 상품이 없습니다.</p>
            </div>
          )}
        </div>
    </MainLayout>
  );
}

    