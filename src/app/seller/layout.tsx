// src/app/seller/layout.tsx
import React from "react";
import { SidebarProvider, Sidebar, SidebarTrigger, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from '@/components/ui/sidebar';
import { Home, Package, MessageSquare, BarChart, Settings, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const SellerNav = () => {
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="대시보드" isActive={true}>
                    <Link href="/seller"><Home /><span>대시보드</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="상품 관리">
                    <Link href="/seller/products"><Package /><span>상품 관리</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="아이디어 제안">
                    <Link href="/seller/proposals"><MessageSquare /><span>아이디어 제안</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="판매 분석">
                    <Link href="/seller/analytics"><BarChart /><span>판매 분석</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="정산">
                    <Link href="/seller/payouts"><BarChart /><span>정산</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton asChild tooltip="설정">
                    <Link href="/seller/settings"><Settings /><span>설정</span></Link>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    );
};

const SellerFooter = () => {
    const { user, signOut } = useAuth();
    if (!user) return null;

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                 <SidebarMenuButton asChild tooltip="내 계정">
                    <div className="flex items-center gap-2">
                        <Avatar className="h-7 w-7">
                            <AvatarImage src={user.photoURL || `https://avatar.vercel.sh/${user.uid}.png`} alt={user.displayName || "user"} />
                            <AvatarFallback>{(user.displayName || user.email || "U").charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col group-data-[collapsible=icon]:hidden">
                            <span className="text-sm font-semibold">{user.displayName}</span>
                            <span className="text-xs text-sidebar-foreground/70">{user.email}</span>
                        </div>
                    </div>
                </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
                <SidebarMenuButton onClick={signOut} tooltip="로그아웃">
                    <LogOut />
                    <span>로그아웃</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="theme-seller">
        <SidebarProvider>
            <Sidebar>
                <SidebarHeader>
                    <SidebarTrigger />
                    <Link href="/seller">
                        <h2 className="font-bold text-lg p-2 group-data-[collapsible=icon]:hidden">prmart Seller</h2>
                    </Link>
                </SidebarHeader>
                <SidebarContent className="p-2">
                    <SellerNav />
                </SidebarContent>
                <SidebarFooter className="p-2">
                    <SellerFooter />
                </SidebarFooter>
            </Sidebar>
            <div className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/30 min-h-screen">
                {children}
            </div>
        </SidebarProvider>
    </div>
  );
}
