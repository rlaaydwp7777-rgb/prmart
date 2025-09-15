import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SellerHeader() {
  return (
     <div className="flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-2 md:hidden">
          <SidebarTrigger/>
           <Link href="/" className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
            </Link>
        </div>
        <div className="ml-auto flex items-center gap-2">
           <AuthButtons />
        </div>
    </div>
  )
}
