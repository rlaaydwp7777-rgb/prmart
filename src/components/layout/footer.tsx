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
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Prompts</a></li>
              <li><a href="#" className="hover:text-primary">Discover</a></li>
              <li><a href="#" className="hover:text-primary">Idea Requests</a></li>
              <li><a href="/seller/dashboard" className="hover:text-primary">Become a Seller</a></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">Support</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Help Center</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover_text-primary">Privacy Policy</a></li>
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
