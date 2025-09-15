
"use client";

import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { META } from '@/lib/string-constants';
import { AuthProvider } from '@/components/auth/auth-provider';
import { getCategories } from '@/lib/firebase/services';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { Category } from '@/lib/types';


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space-grotesk' });

// We can't use metadata export in a client component, but we can set it manually.
// This is a workaround for using usePathname in the root layout.
const setMetadata = () => {
  if (typeof window !== 'undefined') {
    document.title = META.TITLE;
    const descriptionMeta = document.querySelector('meta[name="description"]');
    if (descriptionMeta) {
      descriptionMeta.setAttribute('content', META.DESCRIPTION);
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = META.DESCRIPTION;
      document.head.appendChild(meta);
    }
  }
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<Category[]>([]);
  
  useEffect(() => {
    setMetadata();
    async function fetchCategories() {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories);
    }
    fetchCategories();
  }, []);

  const isSellerPage = pathname.startsWith('/seller');

  return (
    <html lang="ko" suppressHydrationWarning>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body antialiased`}>
        <AuthProvider>
            <div className="flex flex-col min-h-screen">
                {!isSellerPage && <Header categories={categories} />}
                <main className={`flex-1 ${!isSellerPage ? 'pt-16' : ''}`}>
                  {children}
                </main>
                {!isSellerPage && <Footer />}
            </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
