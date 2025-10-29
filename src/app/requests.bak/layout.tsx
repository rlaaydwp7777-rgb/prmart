// src/app/requests/layout.tsx
import React from 'react';

export default function RequestsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold font-headline tracking-tight">
          아이디어 요청
        </h1>
        <p className="text-muted-foreground mt-1">
          필요한 디지털 자산에 대한 아이디어를 공유하고, 전문가들의 제안을 받아보세요.
        </p>
      </header>
      {children}
    </div>
  );
}
