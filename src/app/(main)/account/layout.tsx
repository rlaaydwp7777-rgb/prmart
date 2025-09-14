
"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { List, Download, Star, Heart, Cog } from "lucide-react";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { useAuth } from "@/components/auth/auth-provider";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";


const sidebarNavItems = [
  {
    title: ACCOUNT_STRINGS.NAV_ORDERS,
    href: "/account/orders",
    icon: <List className="mr-2 h-4 w-4" />,
  },
  {
    title: ACCOUNT_STRINGS.NAV_DOWNLOADS,
    href: "/account/downloads",
    icon: <Download className="mr-2 h-4 w-4" />,
  },
  {
    title: ACCOUNT_STRINGS.NAV_REVIEWS,
    href: "/account/reviews",
    icon: <Star className="mr-2 h-4 w-4" />,
  },
  {
    title: ACCOUNT_STRINGS.NAV_WISHLIST,
    href: "/account/wishlist",
    icon: <Heart className="mr-2 h-4 w-4" />,
  },
   {
    title: ACCOUNT_STRINGS.NAV_PROFILE,
    href: "/account/settings",
    icon: <Cog className="mr-2 h-4 w-4" />,
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({ children }: SettingsLayoutProps) {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
        <div className="space-y-6 container pt-16 pb-12 md:pb-20">
             <div className="space-y-0.5">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-4 w-80" />
            </div>
             <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
                <aside className="-mx-4 lg:w-1/5">
                    <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
                        {sidebarNavItems.map((item) => (
                            <Skeleton key={item.href} className="h-10 w-full" />
                        ))}
                    </nav>
                </aside>
                <div className="flex-1 lg:max-w-4xl">
                     <Skeleton className="h-[400px] w-full" />
                </div>
            </div>
        </div>
    );
  }


  return (
    <>
      <div className="space-y-6 container pt-16 pb-12 md:pb-20">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-bold tracking-tight font-headline">{ACCOUNT_STRINGS.HEADLINE}</h1>
          <p className="text-muted-foreground">
            {ACCOUNT_STRINGS.SUBHEADLINE}
          </p>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <nav className="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
              {sidebarNavItems.map((item) => (
                <Button
                  key={item.href}
                  asChild
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname.startsWith(item.href)
                      ? "bg-muted hover:bg-muted"
                      : "hover:bg-transparent hover:underline"
                  )}
                >
                  <Link href={item.href}>
                    {item.icon}
                    {item.title}
                  </Link>
                </Button>
              ))}
            </nav>
          </aside>
          <div className="flex-1 lg:max-w-4xl">{children}</div>
        </div>
      </div>
    </>
  );
}
