
"use client";

import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { HEADER_LINKS } from "@/lib/string-constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import type { Category } from "@/lib/types";

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline tracking-tight">prmart</span>
            </Link>
            <nav className="hidden md:flex gap-4 lg:gap-6 items-center">
              <Link href="/browse" className="font-medium text-muted-foreground transition-colors hover:text-primary">
                {HEADER_LINKS.VIEW_ALL}
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-medium text-muted-foreground transition-colors hover:text-primary px-0">
                    {HEADER_LINKS.CATEGORIES}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64">
                   <DropdownMenuItem asChild>
                     <Link href="/browse">전체보기</Link>
                   </DropdownMenuItem>
                   <DropdownMenuSeparator />
                  {categories.map((category) => (
                    <DropdownMenuSub key={category.slug}>
                      <DropdownMenuSubTrigger>
                        <span>{category.name}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem asChild>
                            <Link href={`/c/${category.slug}`}>
                              {category.name} 전체
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          {category.subCategories && category.subCategories.length > 0 ? (
                            category.subCategories.map((sub) => (
                              <DropdownMenuItem key={sub.slug} asChild>
                                <Link href={`/c/${category.slug}/${sub.slug}`}>
                                  {sub.name}
                                </Link>
                              </DropdownMenuItem>
                            ))
                          ) : (
                             <DropdownMenuItem disabled>하위 카테고리 없음</DropdownMenuItem>
                          )}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/requests" className="font-medium text-muted-foreground transition-colors hover:text-primary">
                {HEADER_LINKS.REQUEST_IDEA}
              </Link>
              <Link href="/seller/dashboard" className="font-medium text-muted-foreground transition-colors hover:text-primary">
                {HEADER_LINKS.START_SELLING}
              </Link>
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
