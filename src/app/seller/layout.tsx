
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, LayoutDashboard, Package, Settings, Landmark, Star, Users, BarChart2, LogOut, PlusCircle, ShoppingCart, Download, Heart, Cog } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { SIDEBAR_STRINGS, AUTH_STRINGS, SELLER_STRINGS, ACCOUNT_STRINGS } from "@/lib/string-constants";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const buyerNavItems = [
  { href: "/seller/orders", icon: ShoppingCart, title: ACCOUNT_STRINGS.NAV_ORDERS },
  { href: "/seller/downloads", icon: Download, title: ACCOUNT_STRINGS.NAV_DOWNLOADS },
  { href: "/seller/my-reviews", icon: Star, title: ACCOUNT_STRINGS.NAV_REVIEWS },
  { href: "/seller/wishlist", icon: Heart, title: ACCOUNT_STRINGS.NAV_WISHLIST },
];

const sellerNavItems = [
  { href: "/seller/dashboard", icon: LayoutDashboard, title: SIDEBAR_STRINGS.DASHBOARD },
  { href: "/seller/products/add", icon: PlusCircle, title: SELLER_STRINGS.ADD_NEW_PRODUCT },
  { href: "/seller/products", icon: Package, title: SIDEBAR_STRINGS.PRODUCTS },
  { href: "/seller/analytics", icon: BarChart2, title: SIDEBAR_STRINGS.ANALYTICS },
  { href: "/seller/reviews", icon: Star, title: SIDEBAR_STRINGS.REVIEWS },
  { href: "/seller/customers", icon: Users, title: SIDEBAR_STRINGS.CUSTOMERS },
  { href: "/seller/payouts", icon: Landmark, title: SIDEBAR_STRINGS.PAYOUTS },
];

const settingsNavItem = { href: "/seller/settings", icon: Cog, title: SIDEBAR_STRINGS.SETTINGS };


export default function SellerLayout({ children }: { children: React.ReactNode; }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileSheetOpen, setIsMobileSheetOpen] = React.useState(false);


  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const userInitial = user.displayName ? user.displayName.charAt(0) : (user.email ? user.email.charAt(0) : 'U');
  
  const NavLink = ({ item }: { item: { href: string, icon: React.ElementType, title: string } }) => (
    <Link
        href={item.href}
        className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-base font-medium transition-all hover:bg-accent hover:text-accent-foreground",
            pathname.startsWith(item.href) ? "bg-accent text-accent-foreground" : "text-muted-foreground"
        )}
        onClick={() => isMobileSheetOpen && setIsMobileSheetOpen(false)}
    >
        <item.icon className="h-5 w-5" />
        {item.title}
    </Link>
  );

  const sidebarContent = (
     <div className="flex flex-col h-full">
        <div className="p-4 border-b">
            <Link href="/" className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-6 w-6 text-primary" />
                <span className="font-bold text-xl font-headline tracking-tight">prmart</span>
            </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
            <nav className="p-4 space-y-4">
                <div>
                  <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">구매 활동</h3>
                  <div className="space-y-1 mt-2">
                    {buyerNavItems.map((item) => <NavLink key={item.href} item={item} />)}
                  </div>
                </div>
                
                <Separator />
                
                <div>
                   <h3 className="px-3 py-2 text-xs font-semibold text-muted-foreground/80 uppercase tracking-wider">판매 활동</h3>
                   <div className="space-y-1 mt-2">
                    {sellerNavItems.map((item) => <NavLink key={item.href} item={item} />)}
                  </div>
                </div>
            </nav>
        </div>
        <div className="mt-auto p-4 border-t space-y-4">
            <div className="space-y-1">
              <NavLink item={settingsNavItem} />
            </div>
             <div className="flex items-center gap-3 border-t pt-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? "user"} data-ai-hint="person face" />
                <AvatarFallback>{userInitial.toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium">{user.displayName || 'prmart user'}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
               <Button variant="ghost" size="icon" className="text-muted-foreground" onClick={signOut}>
                  <LogOut className="h-5 w-5" />
                  <span className="sr-only">로그아웃</span>
              </Button>
            </div>
        </div>
    </div>
  );


  return (
    <div className="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
        <aside className="hidden border-r bg-muted/40 md:block">
            {sidebarContent}
        </aside>
        <div className="flex flex-col">
            <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 md:hidden">
                <Sheet open={isMobileSheetOpen} onOpenChange={setIsMobileSheetOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                            <Menu className="h-5 w-5" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="flex flex-col p-0 w-full max-w-sm bg-muted/40">
                        {sidebarContent}
                    </SheetContent>
                </Sheet>
                 <div className="flex-1 text-center">
                    <Link href="/" className="flex items-center gap-2 font-semibold justify-center">
                        <Sparkles className="h-6 w-6 text-primary" />
                        <span className="font-bold text-xl font-headline tracking-tight">prmart</span>
                    </Link>
                </div>
                <div className="w-8"></div>
            </header>
            <main className="flex-1 overflow-y-auto bg-background">
                <div className="p-4 sm:p-6 lg:p-8">
                    <div className="space-y-0.5 mb-4">
                        <h1 className="text-2xl font-bold tracking-tight font-headline">{ACCOUNT_STRINGS.HEADLINE}</h1>
                        <p className="text-muted-foreground">{ACCOUNT_STRINGS.SUBHEADLINE}</p>
                    </div>
                    {children}
                </div>
            </main>
        </div>
    </div>
  );
}
