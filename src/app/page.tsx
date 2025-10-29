import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-6xl font-bold text-gray-900">
          PRMart
        </h1>
        <p className="text-xl text-gray-600">
          AI 프롬프트 & 디지털 상품 마켓플레이스
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link
            href="/login"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            로그인
          </Link>
          <Link
            href="/admin"
            className="px-8 py-3 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition font-medium"
          >
            관리자
          </Link>
        </div>
      </div>
    </div>
  );
}
