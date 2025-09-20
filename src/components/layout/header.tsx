
"use client";

import Link from "next/link";
import { Sparkles, Menu } from "lucide-react";
import { HEADER_LINKS } from "@/lib/string-constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "../ui/dropdown-menu";
import type { Category } from "@/lib/types";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { useState } from "react";

interface HeaderProps {
  categories: Category[];
}

export function Header({ categories }: HeaderProps) {
  const [isSheetOpen, setSheetOpen] = useState(false);
  
  const navLinks = (
    <>
      <Link href="/browse" className="font-medium text-muted-foreground transition-colors hover:text-primary">
        {HEADER_LINKS.VIEW_ALL}
      </Link>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <button className="font-medium text-muted-foreground transition-colors hover:text-primary flex items-center">
            {HEADER_LINKS.CATEGORIES}
            </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-screen max-w-5xl" align="start">
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-6 p-4">
            {categories.map((category) => (
                <div key={category.id} className="space-y-2">
                <DropdownMenuLabel className="p-0">
                    <Link href={`/c/${category.slug}`} className="font-semibold hover:underline">{category.name}</Link>
                </DropdownMenuLabel>
                <div className="flex flex-col items-start space-y-1">
                    {category.subCategories?.map((sub) => (
                        <DropdownMenuItem key={sub.id} asChild className="p-0 w-full">
                            <Link href={`/c/${category.slug}/${sub.slug}`} className="text-muted-foreground hover:text-foreground text-sm font-normal p-2 w-full justify-start h-auto rounded-sm">
                                {sub.name}
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </div>
                </div>
            ))}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/browse" className="font-semibold">전체 상품 둘러보기</Link>
            </DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>

      <Link href="/requests" className="font-medium text-muted-foreground transition-colors hover:text-primary">
        {HEADER_LINKS.REQUEST_IDEA}
      </Link>
      <Link href="/seller/products/add" className="font-medium text-muted-foreground transition-colors hover:text-primary">
        {HEADER_LINKS.START_SELLING}
      </Link>
    </>
  );

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
              {navLinks}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex flex-col gap-6 p-6">
                   <Link href="/" className="flex items-center gap-2" onClick={() => setSheetOpen(false)}>
                      <Sparkles className="h-6 w-6 text-primary" />
                      <span className="font-bold text-lg font-headline tracking-tight">prmart</span>
                    </Link>
                  <nav className="flex flex-col gap-4 text-lg">
                    {navLinks}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
