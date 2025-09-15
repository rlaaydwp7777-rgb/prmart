
"use client"

import * as React from "react";
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
  SidebarTrigger
} from "@/components/ui/sidebar";
import { Sparkles, LayoutDashboard, Package, Settings, UserCircle, LifeBuoy, Landmark, Star, Users, ChevronDown, BarChart3 } from "lucide-react";
import { SIDEBAR_STRINGS } from "@/lib/string-constants";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { useAuth } from "@/components/auth/auth-provider";
import { usePathname, useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

function SellerHeader() {
  return (
     <div className="flex items-center justify-between h-14 px-4 border-b bg-background">
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger/>
           <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
            </Link>
        </div>
        <div className="flex items-center gap-2 ml-auto">
           <AuthButtons />
        </div>
    </div>
  )
}

function CollapsibleSidebarMenu({
    title,
    icon: Icon,
    children,
    defaultOpen = false,
}: {
    title: string;
    icon: React.ElementType;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) {
    const pathname = usePathname();
    const childRoutes = React.Children.toArray(children).map(child => {
      if (React.isValidElement(child) && child.props.asChild) {
        const linkProps = child.props.children.props;
        return linkProps.href;
      }
      return null;
    }).filter(Boolean);

    const isActive = childRoutes.some(href => pathname.startsWith(href!));

    const [isOpen, setIsOpen] = React.useState(defaultOpen || isActive);

    React.useEffect(() => {
        if(isActive) {
          setIsOpen(true);
        }
    }, [pathname, isActive]);


    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                    <Icon className="h-5 w-5" />
                    <span className="text-base font-medium">{title}</span>
                    <ChevronDown className={cn("ml-auto h-4 w-4 transition-transform", isOpen && "rotate-180")} />
                </SidebarMenuButton>
            </CollapsibleTrigger>
            <CollapsibleContent className="py-1 pl-8 pr-2 space-y-1 data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                {React.Children.map(children, child => {
                    if (React.isValidElement(child)) {
                        const linkHref = child.props.children.props.href;
                        const isChildActive = pathname.startsWith(linkHref);
                        return React.cloneElement(child as React.ReactElement, {
                           "data-active": isChildActive
                        });
                    }
                    return child;
                })}
            </CollapsibleContent>
        </Collapsible>
    );
}


export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
          <div className="space-y-4 text-center">
              <Skeleton className="h-8 w-64 mx-auto" />
              <p className="text-muted-foreground">인증 정보를 확인하는 중입니다...</p>
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
  
  const isActive = (path: string) => pathname.startsWith(path);


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
                 <SidebarMenuButton asChild data-active={pathname === '/seller/dashboard'}>
                    <Link href="/seller/dashboard">
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="text-base font-medium">{SIDEBAR_STRINGS.DASHBOARD}</span>
                    </Link>
                 </SidebarMenuButton>
               </SidebarMenuItem>
                <CollapsibleSidebarMenu title="판매 관리" icon={Package} defaultOpen>
                    <SidebarMenuButton asChild size="sm" variant="ghost" className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground">
                        <Link href="/seller/products">
                          {SIDEBAR_STRINGS.PRODUCTS}
                        </Link>
                    </SidebarMenuButton>
                     <SidebarMenuButton asChild size="sm" variant="ghost" className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground">
                        <Link href="/seller/analytics">
                           {SIDEBAR_STRINGS.ANALYTICS}
                        </Link>
                    </SidebarMenuButton>
                </CollapsibleSidebarMenu>

                <CollapsibleSidebarMenu title="고객 관계" icon={Users}>
                     <SidebarMenuButton asChild size="sm" variant="ghost" className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground">
                        <Link href="/seller/reviews">
                           {SIDEBAR_STRINGS.REVIEWS}
                        </Link>
                    </SidebarMenuButton>
                    <SidebarMenuButton asChild size="sm" variant="ghost" className="data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground">
                        <Link href="/seller/customers">
                           {SIDEBAR_STRINGS.CUSTOMERS}
                        </Link>
                    </SidebarMenuButton>
                </CollapsibleSidebarMenu>
              
               <SidebarMenuItem>
                 <SidebarMenuButton asChild data-active={isActive('/seller/payouts')}>
                    <Link href="/seller/payouts">
                        <Landmark className="h-5 w-5" />
                        <span className="text-base font-medium">{SIDEBAR_STRINGS.PAYOUTS}</span>
                    </Link>
                 </SidebarMenuButton>
               </SidebarMenuItem>
               <SidebarMenuItem>
                 <SidebarMenuButton asChild data-active={isActive('/seller/settings')}>
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
                <SidebarMenuButton asChild>
                  <Link href="#">
                    <LifeBuoy className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.HELP}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/account/settings">
                    <UserCircle className="h-5 w-5" />
                    <span className="text-base font-medium">{SIDEBAR_STRINGS.ACCOUNT}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1 w-full">
          <SellerHeader />
          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
