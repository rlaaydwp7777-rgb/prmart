
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles, LayoutDashboard, Package, Settings, Landmark, Star, Users, BarChart2, LogOut } from "lucide-react";
import { SIDEBAR_STRINGS, AUTH_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/auth-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from "@/components/ui/sidebar";
import { SellerHeader } from "@/components/layout/seller-header";

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
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const userInitial = user.displayName ? user.displayName.charAt(0) : (user.email ? user.email.charAt(0) : 'U');

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <SidebarHeader>
              <Link href="/" className="flex items-center gap-2 font-semibold">
                <Sparkles className="h-6 w-6 text-sidebar-primary" />
                <span className="font-bold text-xl font-headline tracking-tight">prmart</span>
              </Link>
            </SidebarHeader>
            <SidebarMenu>
              {sidebarNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
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
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={signOut}>
                  <LogOut />
                  {AUTH_STRINGS.LOGOUT_LINK}
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col">
          <header className="sticky top-0 z-10 flex h-14 items-center justify-between border-b bg-background px-4 md:hidden">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline tracking-tight">prmart</span>
            </Link>
            <SidebarTrigger />
          </header>
          <main className="flex-1 bg-muted/30">
            <div className="p-4 sm:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

// Custom Loader while auth is loading
const Loader2 = ({ className, ...props }: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
);
