import Link from "next/link";
import { ChevronDown, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { HEADER_LINKS } from "@/lib/string-constants";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CATEGORIES } from "@/lib/constants";
import { Input } from "../ui/input";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg font-headline tracking-tight">prmart</span>
          </Link>
          <nav className="hidden md:flex gap-4 lg:gap-6 items-center text-lg">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="font-medium text-lg">
                  {HEADER_LINKS.VIEW_ALL}
                  <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {CATEGORIES.map((category) => (
                   <DropdownMenuItem key={category.name} asChild>
                     <Link href="#">
                      <category.icon className="mr-2 h-4 w-4" />
                      <span>{category.name}</span>
                     </Link>
                   </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="#" className="font-medium text-muted-foreground transition-colors hover:text-primary text-lg">
              {HEADER_LINKS.REQUEST_IDEA}
            </Link>
            <Link href="/seller/dashboard" className="font-medium text-muted-foreground transition-colors hover:text-primary text-lg">
              {HEADER_LINKS.START_SELLING}
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <AuthButtons />
          </div>
        </div>
        <div className="flex h-16 items-center gap-4 border-b">
            <div className="relative w-full">
               <Input
                type="search"
                placeholder="어떤 노하우를 찾고 계신가요? (예: Notion 템플릿)"
                className="h-12 pl-12 text-base border-2 border-primary/20 focus-visible:ring-primary/50 w-full"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
            </div>
            <Button size="lg" className="h-12 text-base shrink-0">
                <Search className="h-5 w-5 md:mr-2"/>
                <span className="hidden md:inline">검색</span>
            </Button>
        </div>
        <div className="flex h-16 items-center gap-2 overflow-x-auto">
          {CATEGORIES.map((category) => (
            <Button variant="ghost" key={category.name} className="shrink-0">
              <category.icon className="mr-2 h-4 w-4" />
              {category.name}
            </Button>
          ))}
        </div>
      </div>
    </header>
  );
}
