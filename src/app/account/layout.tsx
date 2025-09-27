// src/app/account/layout.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { User, ShoppingCart, Download, Star, Heart } from "lucide-react";

const navItems = [
  { href: "/account/profile", icon: User, label: ACCOUNT_STRINGS.NAV_PROFILE },
  { href: "/account/orders", icon: ShoppingCart, label: ACCOUNT_STRINGS.NAV_ORDERS },
  { href: "/account/downloads", icon: Download, label: ACCOUNT_STRINGS.NAV_DOWNLOADS },
  { href: "/account/reviews", icon: Star, label: ACCOUNT_STRINGS.NAV_REVIEWS },
  { href: "/account/wishlist", icon: Heart, label: ACCOUNT_STRINGS.NAV_WISHLIST },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">{ACCOUNT_STRINGS.HEADLINE}</h1>
            <p className="text-muted-foreground mt-1">{ACCOUNT_STRINGS.SUBHEADLINE}</p>
        </header>
      <div className="grid md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.href}
                  asChild
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className="justify-start"
                >
                  <Link href={item.href}>
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </nav>
        </aside>
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  );
}
