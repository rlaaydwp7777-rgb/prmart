
import { notFound } from "next/navigation";
import { getCategories, getProductsByCategorySlug } from "@/lib/firebase/services";
import type { Category, SubCategory } from "@/lib/types";
import { ProductFilters } from "@/components/browse/product-filters";

interface Props {
  params: {
    slug?: string[]; // catch-all
  };
}

export default async function CategoryCatchAll({ params }: Props) {
  const slugParts = params.slug || [];
  const categorySlug = slugParts[0] ? decodeURIComponent(slugParts[0]) : null;
  const subCategorySlug = slugParts[1] ? decodeURIComponent(slugParts[1]) : null;

  if (!categorySlug) {
    notFound();
  }

  const allCategories = await getCategories();

  const category = allCategories.find(c => c.slug === categorySlug);
  if (!category) {
    notFound();
  }
  
  let subCategory: SubCategory | undefined;
  if (subCategorySlug) {
      subCategory = category.subCategories?.find(sc => sc.slug === subCategorySlug);
      if(!subCategory){
          notFound();
      }
  }

  const prompts = await getProductsByCategorySlug(categorySlug);
  
  const pageTitle = subCategory ? subCategory.name : category.name;
  const pageDescription = `${pageTitle} 카테고리의 모든 디지털 자산을 확인하고 당신의 다음 프로젝트에 영감을 더하세요.`;


  return (
      <div className="container px-4 md:px-6 pt-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
            {pageTitle}
          </h1>
          <p className="max-w-[900px] text-muted-foreground md:text-xl">
            {pageDescription}
          </p>
        </div>
        
        <ProductFilters 
          initialPrompts={prompts}
          category={category}
          activeSubCategorySlug={subCategorySlug}
        />
      </div>
  );
}
