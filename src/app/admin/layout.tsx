// src/app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <nav className="flex flex-col space-y-2">
          <Link href="/admin" className="px-4 py-2 rounded hover:bg-gray-700">대시보드</Link>
          <Link href="/admin/products" className="px-4 py-2 rounded hover:bg-gray-700">상품 승인</Link>
          <Link href="/admin/users" className="px-4 py-2 rounded hover:bg-gray-700">사용자 관리</Link>
          <Link href="/admin/orders" className="px-4 py-2 rounded hover:bg-gray-700">거래 내역</Link>
        </nav>
      </aside>
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}
