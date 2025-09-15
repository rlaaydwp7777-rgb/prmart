"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function SellerRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/seller/dashboard');
  }, [router]);

  return (
    <div className="flex h-full min-h-[50vh] w-full items-center justify-center">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <p>대시보드로 이동 중입니다...</p>
      </div>
    </div>
  );
}
