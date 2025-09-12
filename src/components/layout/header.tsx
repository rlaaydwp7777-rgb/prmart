import Link from "next/link";
import { ChevronDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { HEADER_LINKS } from "@/lib/string-constants";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { CATEGORIES } from "@/lib/constants";

export function Header() {
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
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="font-medium text-muted-foreground transition-colors hover:text-primary px-0">
                      <span className="mr-1">{HEADER_LINKS.CATEGORIES}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64">
                    {CATEGORIES.map((category, catIndex) => {
                      const Icon = category.icon;
                      return (
                        <DropdownMenuSub key={`${category.slug}-${catIndex}`}>
                          <DropdownMenuSubTrigger>
                            <Icon className="mr-2 h-4 w-4" />
                            <span>{category.name}</span>
                          </DropdownMenuSubTrigger>
                          <DropdownMenuPortal>
                            <DropdownMenuSubContent>
                              {category.subCategories.map((sub, subIndex) => (
                                <DropdownMenuItem key={`${sub.slug}-${subIndex}`} asChild>
                                  <Link href={`/c/${category.slug}/${sub.slug}`}>
                                    {sub.name}
                                  </Link>
                                </DropdownMenuItem>
                              ))}
                            </DropdownMenuSubContent>
                          </DropdownMenuPortal>
                        </DropdownMenuSub>
                      );
                    })}
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
