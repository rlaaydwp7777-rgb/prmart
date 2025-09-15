"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, LayoutDashboard, Package, Settings, LifeBuoy, Landmark, Star, Users, BarChart2 } from "lucide-react";
import { SIDEBAR_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SellerHeader } from "@/components/layout/seller-header";
import { SidebarProvider, Sidebar } from "@/components/ui/sidebar";

const sidebarNavItems = [
  { href: "/seller/dashboard", icon: LayoutDashboard, title: SIDEBAR_STRINGS.DASHBOARD },
  { href: "/seller/products", icon: Package, title: SIDEBAR_STRINGS.PRODUCTS },
  { href: "/seller/analytics", icon: BarChart2, title: SIDEBAR_STRINGS.ANALYTICS },
  { href: "/seller/reviews", icon: Star, title: SIDEBAR_STRINGS.REVIEWS },
  { href: "/seller/customers", icon: Users, title: SIDEBAR_STRINGS.CUSTOMERS },
  { href: "/seller/payouts", icon: Landmark, title: SIDEBAR_STRINGS.PAYOUTS },
  { href: "/seller/settings", icon: Settings, title: SIDEBAR_STRINGS.SETTINGS },
];


export default function SellerLayout({ children }: { children: React.ReactNode; }) {
  const { user, loading, signOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <Skeleton className="h-full w-64" />
        <div className="flex-1 p-8">
            <Skeleton className="h-14 w-full mb-8" />
            <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  const userInitial = user.displayName ? user.displayName.charAt(0) : (user.email ? user.email.charAt(0) : 'U');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <Sidebar className="hidden md:flex md:flex-col md:w-64 border-r bg-sidebar text-sidebar-foreground">
            <div className="flex h-16 items-center border-b px-6">
              <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Sparkles className="h-6 w-6 text-primary" />
                  <span className="font-bold text-xl font-headline tracking-tight">prmart</span>
              </Link>
            </div>
            <nav className="flex-1 space-y-2 p-4">
              {sidebarNavItems.map((item) => (
                  <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground ${
                      pathname === item.href ? "bg-sidebar-accent text-sidebar-accent-foreground font-semibold" : "text-muted-foreground"
                  }`}
                  >
                  <item.icon className="h-5 w-5" />
                  <span className="text-base font-medium">{item.title}</span>
                  </Link>
              ))}
            </nav>
            <div className="mt-auto border-t p-4 border-sidebar-border">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                        <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? "user"} data-ai-hint="person face" />
                        <AvatarFallback>{userInitial.toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 truncate">
                        <p className="text-sm font-medium">{user.displayName || 'prmart user'}</p>
                        <p className="text-xs text-muted-foreground truncate">{user.email}</p>
                    </div>
                </div>
                <Button variant="ghost" className="mt-2 w-full justify-start hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" asChild>
                    <Link href="/account/settings">
                        <LifeBuoy className="mr-2 h-4 w-4" />
                        {SIDEBAR_STRINGS.ACCOUNT}
                    </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={signOut}>
                    {AUTH_STRINGS.LOGOUT_LINK}
                </Button>
            </div>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          <SellerHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
              <div className="mx-auto w-full max-w-7xl">
                  {children}
              </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
