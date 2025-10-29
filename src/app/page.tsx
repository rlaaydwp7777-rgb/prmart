import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-gray-800">
          PRMart
        </h1>
        <p className="text-lg text-gray-600">
          AI 프롬프트 & 디지털 상품 마켓플레이스
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition">
            로그인
          </Link>
          <Link href="/admin" className="px-6 py-2 bg-white text-black border rounded-md hover:bg-gray-100 transition">
            관리자
          </Link>
        </div>
      </div>
    </div>
  );
}
