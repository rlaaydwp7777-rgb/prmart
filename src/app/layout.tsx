import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PRMart - AI 프롬프트 마켓플레이스",
  description: "AI 프롬프트와 디지털 상품을 사고파는 플랫폼",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
