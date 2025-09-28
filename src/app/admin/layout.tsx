// src/app/admin/layout.tsx
import React from 'react';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebaseAdmin";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Users, Package, BarChart, Settings } from "lucide-react";
import Link from "next/link";

async function verifyAdminRole() {
  const token = cookies().get("firebaseIdToken")?.value;
  if (!token) {
    redirect("/login?continueUrl=/admin");
  }

  try {
    if (!adminAuth) {
      throw new Error("Admin Auth not initialized");
    }
    const decoded = await adminAuth.verifyIdToken(token);
    if (decoded.role !== "admin") {
      redirect("/");
    }
    return true;
  } catch (error) {
    console.error("[ADMIN_GUARD_FAIL] Admin verification failed:", error);
    redirect("/login?continueUrl=/admin&error=session-expired");
  }
}


const AdminNav = () => {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="대시보드" isActive={true}>
                    <Link href="/admin"><Home /><span>대시보드</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="사용자 관리">
                    <Link href="/admin/users"><Users /><span>사용자 관리</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="상품 관리">
                    <Link href="/admin/products"><Package /><span>상품 관리</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="통계">
                    <Link href="/admin/analytics"><BarChart /><span>통계</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="설정">
                    <Link href="/admin/settings"><Settings /><span>설정</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await verifyAdminRole();
  
  return (
    <SidebarProvider>
        <Sidebar>
            <SidebarHeader>
                 <SidebarTrigger />
                 <h2 className="font-bold text-lg p-2 group-data-[collapsible=icon]:hidden">prmart Admin</h2>
            </SidebarHeader>
            <SidebarContent className="p-2">
                <AdminNav />
            </SidebarContent>
        </Sidebar>
        <div className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
        </div>
    </SidebarProvider>
  );
}
