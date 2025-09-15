
"use client";

import * as React from "react";
import { getCategories, getProducts } from "@/lib/firebase/services";
import type { Prompt, Category } from "@/lib/types";
import { Loader2 } from "lucide-react";
import { ProductFilters } from "@/components/browse/product-filters";

export default function BrowsePage() {
  const [products, setProducts] = React.useState<Prompt[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    Promise.all([
      getProducts(),
      getCategories()
    ]).then(([fetchedProducts, fetchedCategories]) => {
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="container px-4 md:px-6 text-center py-20">
        <Loader2 className="h-10 w-10 animate-spin mx-auto text-muted-foreground" />
      </div>
    )
  }
  
  return (
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-headline tracking-tighter">
          전체 아이디어 둘러보기
        </h1>
        <p className="max-w-[900px] text-muted-foreground md:text-xl">
          prmart의 모든 디지털 자산을 확인하고 당신의 다음 프로젝트에 영감을 더하세요.
        </p>
      </div>
      
      <ProductFilters 
        initialPrompts={products}
        allCategories={categories}
      />
    </div>
  );
}
