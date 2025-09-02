import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-xl">prmart</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              상상이 자산이 되는 곳.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">바로가기</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">상품</a></li>
              <li><a href="#" className="hover:text-primary">둘러보기</a></li>
              <li><a href="#" className="hover:text-primary">아이디어 요청</a></li>
              <li><a href="/seller/dashboard" className="hover:text-primary">판매자 되기</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">고객지원</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">고객센터</a></li>
              <li><a href="#" className="hover:text-primary">이용약관</a></li>
              <li><a href="#" className="hover:text-primary">개인정보처리방침</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Legal</h4>
            <div className="text-sm text-muted-foreground space-y-1">
                <p><strong>상호:</strong> 프마트(prmart)</p>
                <p><strong>대표:</strong> 김명제</p>
                <p><strong>사업자등록번호:</strong> 102-34-63631</p>
                <p><strong>통신판매업신고번호:</strong> 2024-부산기장-0000</p>
                <p><strong>주소:</strong> 부산광역시 기장군 일광읍 삼성2길 6, 5층 2호</p>
                <p><strong>이메일:</strong> prmart7777@gmail.com</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} prmart. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
