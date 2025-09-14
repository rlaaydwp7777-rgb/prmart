
import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { META } from '@/lib/string-constants';
import { AuthProvider } from '@/components/auth/auth-provider';
import { getCategories } from '@/lib/firebase/services';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

export const metadata: Metadata = {
  title: META.TITLE,
  description: META.DESCRIPTION,
  icons: [{ rel: "icon", url: META.ICON_URL }]
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await getCategories();

  return (
    <html lang="ko">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            <Header categories={categories} />
            <main className="flex-1 pt-24">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
