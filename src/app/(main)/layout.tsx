import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MainLayout } from "@/components/layout/main-layout";

export default function RootMainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
