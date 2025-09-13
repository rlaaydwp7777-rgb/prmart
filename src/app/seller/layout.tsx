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
import { Sparkles, LayoutDashboard, Package, BarChart3, Settings, UserCircle, LifeBuoy, LogIn } from "lucide-react";
import { SIDEBAR_STRINGS } from "@/lib/string-constants";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";
import { UserMenu } from "@/components/auth/user-menu";
import { redirect } from "next/navigation";

function SellerHeader() {
  const { user, loading } = useAuth();

  return (
     <div className="flex items-center justify-between md:justify-end mb-4">
        <div className="md:hidden">
            <SidebarTrigger/>
        </div>
        <div>
          {loading ? (
            <Skeleton className="h-8 w-24" />
          ) : user ? (
            <UserMenu user={user} />
          ) : (
            <Button asChild>
                <Link href="/login">로그인</Link>
            </Button>
          )}
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
  
  if (loading) {
      return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-muted-foreground">인증 정보를 불러오는 중...</p>
        </div>
      )
  }

  if (!user) {
    redirect('/login');
  }
  
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background">
        <Sidebar>
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
                    <LayoutDashboard />
                    <span className="text-sm">{SIDEBAR_STRINGS.DASHBOARD}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.PRODUCTS}>
                  <Link href="/seller/products">
                    <Package />
                    <span className="text-sm">{SIDEBAR_STRINGS.PRODUCTS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.ANALYTICS}>
                  <Link href="/seller/analytics">
                    <BarChart3 />
                    <span className="text-sm">{SIDEBAR_STRINGS.ANALYTICS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.SETTINGS}>
                  <Link href="/seller/settings">
                    <Settings />
                    <span className="text-sm">{SIDEBAR_STRINGS.SETTINGS}</span>
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
                    <LifeBuoy />
                    <span className="text-sm">{SIDEBAR_STRINGS.HELP}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.ACCOUNT}>
                  <Link href="/account/settings">
                    <UserCircle />
                    <span className="text-sm">{SIDEBAR_STRINGS.ACCOUNT}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="p-4 sm:p-6 lg:p-8">
            <SellerHeader />
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
