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
import { Sparkles, LayoutDashboard, Package, BarChart3, Settings, UserCircle, LifeBuoy } from "lucide-react";
import { SIDEBAR_STRINGS } from "@/lib/string-constants";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
                    <span>{SIDEBAR_STRINGS.DASHBOARD}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.PRODUCTS}>
                  <Link href="#">
                    <Package />
                    <span>{SIDEBAR_STRINGS.PRODUCTS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
               <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.ANALYTICS}>
                  <Link href="#">
                    <BarChart3 />
                    <span>{SIDEBAR_STRINGS.ANALYTICS}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.SETTINGS}>
                  <Link href="#">
                    <Settings />
                    <span>{SIDEBAR_STRINGS.SETTINGS}</span>
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
                    <span>{SIDEBAR_STRINGS.HELP}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip={SIDEBAR_STRINGS.ACCOUNT}>
                  <Link href="#">
                    <UserCircle />
                    <span>{SIDEBAR_STRINGS.ACCOUNT}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <div className="p-4 sm:p-6 lg:p-8">
             <div className="flex items-center justify-between md:justify-end mb-4">
                <div className="md:hidden">
                    <SidebarTrigger/>
                </div>
            </div>
            {children}
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
