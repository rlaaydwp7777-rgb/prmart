import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pt-24 pb-12 md:pt-28 md:pb-20">{children}</main>
      <Footer />
    </div>
  );
}

    