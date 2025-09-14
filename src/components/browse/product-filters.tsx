
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { PromptCard } from "@/components/prompts/prompt-card";
import type { Prompt, Category, SubCategory } from "@/lib/types";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ProductFiltersProps {
  initialPrompts: Prompt[];
  category: Category;
  activeSubCategorySlug: string | null;
}

const sortOptions = [
    { value: "popular", label: "인기순" },
    { value: "newest", label: "최신순" },
    { value: "price-desc", label: "가격 높은순" },
    { value: "price-asc", label: "가격 낮은순" },
];

export function ProductFilters({ initialPrompts, category, activeSubCategorySlug }: ProductFiltersProps) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedSubCategory, setSelectedSubCategory] = React.useState(activeSubCategorySlug || "all");
    const [sortBy, setSortBy] = React.useState("popular");
    const [priceFilter, setPriceFilter] = React.useState("all");

    const filteredAndSortedPrompts = React.useMemo(() => {
        let filtered = initialPrompts;

        // Filter by sub-category
        if (selectedSubCategory !== "all") {
            filtered = filtered.filter(prompt => prompt.subCategorySlug === selectedSubCategory);
        }

        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(prompt => 
                prompt.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // Filter by price
        if (priceFilter === 'paid') {
            filtered = filtered.filter(prompt => prompt.price > 0);
        } else if (priceFilter === 'free') {
            filtered = filtered.filter(prompt => prompt.price === 0);
        }


        // Sort
        const sorted = [...filtered].sort((a, b) => {
            switch (sortBy) {
                case "newest":
                    return new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime();
                case "price-desc":
                    return b.price - a.price;
                case "price-asc":
                    return a.price - b.price;
                case "popular":
                default:
                    return (b.rating ?? 0) - (a.rating ?? 0);
            }
        });

        return sorted;

    }, [initialPrompts, selectedSubCategory, searchQuery, sortBy, priceFilter]);

    return (
        <div className="space-y-8">
            {/* Filters and Sorters */}
            <div className="space-y-4">
                {/* Sub Categories */}
                <div className="flex flex-wrap justify-center gap-2">
                     <Button 
                        onClick={() => setSelectedSubCategory("all")}
                        variant={selectedSubCategory === "all" ? "default" : "outline"}
                    >
                       전체
                    </Button>
                    {category.subCategories.map((sub) => (
                        <Button 
                            key={sub.slug} 
                            variant={selectedSubCategory === sub.slug ? "default" : "outline"}
                            onClick={() => setSelectedSubCategory(sub.slug)}
                        >
                            {sub.name}
                        </Button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    {/* Search Input */}
                    <div className="relative md:col-span-2">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder={`${category.name} 내에서 검색...`}
                            className="pl-10 h-11 text-base"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Sorter and Price Filter */}
                    <div className="grid grid-cols-2 gap-2">
                         <Select value={priceFilter} onValueChange={setPriceFilter}>
                            <SelectTrigger className="h-11 text-base">
                                <SelectValue placeholder="가격" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">전체</SelectItem>
                                <SelectItem value="paid">유료</SelectItem>
                                <SelectItem value="free">무료</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="h-11 text-base">
                                <SelectValue placeholder="정렬" />
                            </SelectTrigger>
                            <SelectContent>
                                {sortOptions.map(option => (
                                     <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            {filteredAndSortedPrompts.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredAndSortedPrompts.map((prompt) => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <p className="text-muted-foreground text-lg">해당 조건에 맞는 상품이 없습니다.</p>
                    <Button asChild variant="link" className="mt-4">
                        <Link href="/browse">전체 상품 둘러보기</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}
