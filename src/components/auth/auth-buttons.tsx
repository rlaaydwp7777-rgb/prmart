
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
import { signOut } from "@/lib/firebase/auth";
import { AUTH_STRINGS, SIDEBAR_STRINGS } from "@/lib/string-constants";
import { LayoutDashboard, Settings, LogOut } from "lucide-react";

export function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />;
  }

  if (user) {
    const userInitial = user.displayName ? user.displayName.charAt(0) : (user.email ? user.email.charAt(0) : 'U');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-10 w-10 rounded-full">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? "user"} data-ai-hint="person face" />
              <AvatarFallback>{userInitial.toUpperCase()}</AvatarFallback>
            </Avatar>
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
                    <Settings className="mr-2 h-4 w-4" />
                    <span>{SIDEBAR_STRINGS.SETTINGS}</span>
                </Link>
            </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
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
