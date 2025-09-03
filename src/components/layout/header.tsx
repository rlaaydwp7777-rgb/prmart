import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { HEADER_LINKS } from "@/lib/string-constants";
import { cn } from "@/lib/utils";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl font-headline tracking-tight">prmart</span>
        </Link>
        <nav className="hidden md:flex gap-4 lg:gap-6 items-center text-lg lg:text-xl">
          <Link href="#" className="font-medium text-muted-foreground transition-colors hover:text-primary">
            {HEADER_LINKS.PRODUCTS}
          </Link>
          <Link href="#" className="font-medium text-muted-foreground transition-colors hover:text-primary">
            {HEADER_LINKS.BROWSE}
          </Link>
          <Link href="#" className="font-medium text-muted-foreground transition-colors hover:text-primary">
            {HEADER_LINKS.REQUEST_IDEA}
          </Link>
          <Link href="/seller/dashboard" className="font-medium text-muted-foreground transition-colors hover:text-primary">
            {HEADER_LINKS.START_SELLING}
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
