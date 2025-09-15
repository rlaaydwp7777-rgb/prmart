import Link from "next/link";
import { Sparkles } from "lucide-react";
import { AuthButtons } from "@/components/auth/auth-buttons";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SellerHeader() {
  return (
     <div className="flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="md:hidden">
          <SidebarTrigger/>
        </div>
        <div className="hidden md:block"></div> {/* This empty div pushes AuthButtons to the right on desktop */}
        <div className="flex items-center gap-2">
           <AuthButtons />
        </div>
    </div>
  )
}
