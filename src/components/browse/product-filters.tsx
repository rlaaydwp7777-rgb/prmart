
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
  category?: Category; // Make category optional for "Browse All" page
  allCategories?: Category[]; // Add this for "Browse All" page
  activeSubCategorySlug?: string | null;
}

const sortOptions = [
    { value: "popular", label: "인기순" },
    { value: "newest", label: "최신순" },
    { value: "price-desc", label: "가격 높은순" },
    { value: "price-asc", label: "가격 낮은순" },
];

export function ProductFilters({ initialPrompts, category, allCategories, activeSubCategorySlug }: ProductFiltersProps) {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedFilter, setSelectedFilter] = React.useState(activeSubCategorySlug || "all");
    const [sortBy, setSortBy] = React.useState("popular");
    const [priceFilter, setPriceFilter] = React.useState("all");

    const isBrowseAllPage = !category;

    const filteredAndSortedPrompts = React.useMemo(() => {
        let filtered = initialPrompts;

        if (selectedFilter !== "all") {
             if (isBrowseAllPage) {
                // Filter by main category slug on browse all page
                filtered = filtered.filter(prompt => prompt.categorySlug === selectedFilter);
            } else {
                // Filter by sub-category slug on category page
                filtered = filtered.filter(prompt => prompt.subCategorySlug === selectedFilter);
            }
        }
        
        // Filter by search query
        if (searchQuery) {
            filtered = filtered.filter(prompt => 
                prompt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                prompt.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
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

    }, [initialPrompts, selectedFilter, searchQuery, sortBy, priceFilter, isBrowseAllPage]);

    const filterItems = isBrowseAllPage 
        ? allCategories?.map(c => ({ slug: c.slug, name: c.name })) || []
        : category?.subCategories.map(sc => ({ slug: sc.slug, name: sc.name })) || [];


    return (
        <div className="space-y-8">
            <div className="space-y-6">
                <div className="flex flex-wrap justify-start gap-2">
                     <Button 
                        onClick={() => setSelectedFilter("all")}
                        variant={selectedFilter === "all" ? "default" : "outline"}
                    >
                       전체
                    </Button>
                    {filterItems.map((item) => (
                        <Button 
                            key={item.slug} 
                            variant={selectedFilter === item.slug ? "default" : "outline"}
                            onClick={() => setSelectedFilter(item.slug)}
                        >
                            {item.name}
                        </Button>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="relative w-full md:flex-1">
                         <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <Input 
                            placeholder={`${category?.name || '전체 상품'} 내에서 검색...`}
                            className="pl-10 h-11 text-base"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full md:w-auto">
                         <Select value={priceFilter} onValueChange={setPriceFilter}>
                            <SelectTrigger className="h-11 text-base w-full md:w-[120px]">
                                <SelectValue placeholder="가격" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">전체 가격</SelectItem>
                                <SelectItem value="paid">유료</SelectItem>
                                <SelectItem value="free">무료</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={sortBy} onValueChange={setSortBy}>
                            <SelectTrigger className="h-11 text-base w-full md:w-[120px]">
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
