import { Header } from "@/components/layout/seller-header";
import { Sidebar } from "@/components/layout/seller-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

interface SellerLayoutProps {
  children: React.ReactNode;
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Header />
          <main className="flex-1 p-4 md:p-8 pt-16">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
