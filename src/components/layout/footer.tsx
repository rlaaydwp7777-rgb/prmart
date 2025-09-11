import { Sparkles } from "lucide-react";
import Link from "next/link";
import { FOOTER_STRINGS } from "@/lib/string-constants";

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold font-headline text-xl">{FOOTER_STRINGS.COMPANY_NAME_KO}</span>
            </Link>
            <p className="text-muted-foreground">
              {FOOTER_STRINGS.SLOGAN}
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">{FOOTER_STRINGS.QUICK_LINKS}</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="/browse" className="hover:text-primary">{FOOTER_STRINGS.PRODUCTS}</Link></li>
              <li><Link href="/browse" className="hover:text-primary">{FOOTER_STRINGS.BROWSE}</Link></li>
              <li><Link href="/requests" className="hover:text-primary">{FOOTER_STRINGS.REQUEST_IDEA}</Link></li>
              <li><Link href="/seller/dashboard" className="hover:text-primary">{FOOTER_STRINGS.BECOME_SELLER}</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">{FOOTER_STRINGS.SUPPORT}</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li><Link href="#" className="hover:text-primary">{FOOTER_STRINGS.SUPPORT_CENTER}</Link></li>
              <li><Link href="#" className="hover:text-primary">{FOOTER_STRINGS.TERMS}</Link></li>
              <li><Link href="#" className="hover:text-primary">{FOOTER_STRINGS.PRIVACY_POLICY}</Link></li>
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold">{FOOTER_STRINGS.LEGAL}</h4>
            <div className="text-muted-foreground space-y-1 text-sm">
                <p><strong>{FOOTER_STRINGS.COMPANY_NAME}:</strong> {FOOTER_STRINGS.COMPANY_NAME_KO} ({FOOTER_STRINGS.COMPANY_NAME_EN})</p>
                <p><strong>{FOOTER_STRINGS.CEO}:</strong> {FOOTER_STRINGS.CEO_NAME}</p>
                <p><strong>{FOOTER_STRINGS.BUSINESS_NUMBER}:</strong> {FOOTER_STRINGS.BUSINESS_NUMBER_VALUE}</p>
                <p><strong>{FOOTER_STRINGS.ECOMMERCE_NUMBER}:</strong> {FOOTER_STRINGS.ECOMMERCE_NUMBER_VALUE}</p>
                <p><strong>{FOOTER_STRINGS.ADDRESS}:</strong> {FOOTER_STRINGS.ADDRESS_VALUE}</p>
                <p><strong>{FOOTER_STRINGS.EMAIL}:</strong> {FOOTER_STRINGS.EMAIL_VALUE}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          {FOOTER_STRINGS.COPYRIGHT}
        </div>
      </div>
    </footer>
  );
}
