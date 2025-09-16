

"use client";

import { useAuth } from "./auth-provider";
import { Button } from "../ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase/auth";
import { AUTH_STRINGS, SIDEBAR_STRINGS } from "@/lib/string-constants";
import { LayoutDashboard, Cog, LogOut, ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";

export function AuthButtons() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
        await signOut(auth);
        router.push('/');
    } catch(e) {
        console.error("Sign out error", e);
    }
  }

  if (loading) {
    return <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />;
  }

  if (user) {
    const userInitial = user.displayName ? user.displayName.charAt(0) : (user.email ? user.email.charAt(0) : 'U');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-3 h-12 px-3">
             <Avatar className="h-9 w-9">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? "user"} />
              <AvatarFallback>{userInitial.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-left hidden md:block">
                <p className="text-sm font-medium leading-tight">{user.displayName || AUTH_STRINGS.USER_MENU_GREETING}</p>
                <p className="text-xs text-muted-foreground">prmart 사용자</p>
            </div>
            <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.displayName || AUTH_STRINGS.USER_MENU_GREETING}</p>
              <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
                <Link href="/seller/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>{SIDEBAR_STRINGS.DASHBOARD}</span>
                </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
                <Link href="/seller/settings">
                    <Cog className="mr-2 h-4 w-4" />
                    <span>{SIDEBAR_STRINGS.SETTINGS}</span>
                </Link>
            </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-destructive focus:text-destructive">
             <LogOut className="mr-2 h-4 w-4" />
            <span>{AUTH_STRINGS.LOGOUT_LINK}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <Button asChild variant="ghost" size="sm">
        <Link href="/login">{AUTH_STRINGS.LOGIN}</Link>
      </Button>
      <Button asChild size="sm">
        <Link href="/signup">{AUTH_STRINGS.SIGNUP}</Link>
      </Button>
    </div>
  );
}
