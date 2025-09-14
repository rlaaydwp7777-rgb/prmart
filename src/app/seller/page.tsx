
"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/seller/dashboard');
  }, [router]);

  return null; // or a loading spinner
}
