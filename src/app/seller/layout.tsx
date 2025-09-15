
"use client"

import Link from "next/link";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarHeader, 
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Sparkles, LayoutDashboard, Package, BarChart3, Settings, UserCircle, LifeBuoy, Landmark, Star, Users } from "lucide-react";
import { SIDEBAR_STRINGS } from "@/lib/string-constants";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { useAuth } from "@/components/auth/auth-provider";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function SellerHeader() {
  return (
     <div className="flex items-center justify-between md:justify-end mb-4 h-14 px-4 border-b md:border-b-0 md:h-auto md:px-0 md:mb-0">
        <div className="md:hidden">
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg font-headline tracking-tight">prmart</span>
            </Link>
        </div>
        <div className="flex items-center gap-2">
           <AuthButtons />
           <div className="md:hidden">
            <SidebarTrigger/>
           </div>
        </div>
    </div>
  )
}

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
          <div className="space-y-4 text-center">
              <p className="text-muted-foreground">인증 정보를 확인하는 중입니다...</p>
              <Skeleton className="h-10 w-64 mx-auto" />
          </div>
      </div>
    );
  }

  if (!user) {
     return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="space-y-4 text-center">
                <h1 className="text-2xl font-bold">로그인 필요</h1>
                <p className="text-muted-foreground">이 페이지에 접근하려면 로그인이 필요합니다.</p>
                <Button asChild>
                    <Link href="/login">로그인 페이지로 이동</Link>
                </Button>
            </div>
        </div>
     )
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar className="w-64">
          <SidebarHeader>
            <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-sidebar-primary" />
              <span className="font-bold text-xl font-headline tracking-tight">prmart</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.DASHBOARD}>
                  <Link href="/seller/dashboard">
                    <LayoutDashboard className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.DASHBOARD}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.ANALYTICS}>
                  <Link href="/seller/analytics">
                    <BarChart3 className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.ANALYTICS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.PRODUCTS}>
                  <Link href="/seller/products">
                    <Package className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.PRODUCTS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.REVIEWS}>
                  <Link href="/seller/reviews">
                    <Star className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.REVIEWS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.PAYOUTS}>
                   <Link href="/seller/payouts">
                    <Landmark className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.PAYOUTS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.CUSTOMERS}>
                  <Link href="/seller/customers">
                    <Users className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.CUSTOMERS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.SETTINGS}>
                  <Link href="/seller/settings">
                    <Settings className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.SETTINGS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.HELP}>
                  <Link href="#">
                    <LifeBuoy className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.HELP}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.ACCOUNT}>
                  <Link href="/account/settings">
                    <UserCircle className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.ACCOUNT}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 w-full">
          <SellerHeader />
          <main className="p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
