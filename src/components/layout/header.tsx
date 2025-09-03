import Link from "next/link";
import { Bell, ChevronDown, Globe, Search, ShoppingCart, Sparkles } from "lucide-react";
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

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
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
                  <Button variant="ghost" className="font-medium text-muted-foreground hover:text-primary p-0 h-auto">
                    {HEADER_LINKS.CATEGORIES}
                    <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {CATEGORIES.map((category) => (
                     <DropdownMenuItem key={category.name} asChild>
                       <Link href={`/c/${encodeURIComponent(category.name.toLowerCase())}`}>
                        <category.icon className="mr-2 h-4 w-4" />
                        <span>{category.name}</span>
                       </Link>
                     </DropdownMenuItem>
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
             <Button variant="ghost" size="icon" aria-label="Language">
              <Globe />
            </Button>
             <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell />
            </Button>
             <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart />
            </Button>
            <AuthButtons />
          </div>
        </div>
      </div>
    </header>
  );
}
