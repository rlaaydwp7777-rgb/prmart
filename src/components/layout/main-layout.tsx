
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getCategories } from "@/lib/firebase/services";

export async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <div className="flex flex-col min-h-screen">
      <Header categories={categories} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer />
    </div>
  );
}

    