import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { HEADER_LINKS } from "@/lib/string-constants";
import { cn } from "@/lib/utils";

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
               <Link href="/browse" className="font-medium text-muted-foreground transition-colors hover:text-primary">
                 {HEADER_LINKS.VIEW_ALL}
              </Link>
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
