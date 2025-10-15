// src/app/admin/layout.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Package, Users, BadgeDollarSign, Shield } from "lucide-react";

const navItems = [
  { href: "/admin", label: "대시보드", icon: Home },
  { href: "/admin/products", label: "상품 관리", icon: Package },
  { href: "/admin/users", label: "사용자 관리", icon: Users },
  { href: "/admin/orders", label: "주문 내역", icon: BadgeDollarSign },
  // { href: "/admin/payouts", label: "정산 관리", icon: "Settings" }, // Placeholder
  // { href: "/admin/risks", label: "리스크 관리", icon: Shield },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/admin" className="flex items-center gap-2 font-semibold">
              <Shield className="h-6 w-6" />
              <span className="">prmart 관리자 센터</span>
            </Link>
          </div>
          <div className="flex-1">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                if (typeof Icon === 'string') return null; // Hide placeholders for now
                return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                        pathname === item.href
                          ? "bg-muted text-primary"
                          : "text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                )
            })}
            </nav>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          {/* Mobile Nav could be here */}
          <div className="w-full flex-1">
             {/* Optional: Add a search bar */}
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
