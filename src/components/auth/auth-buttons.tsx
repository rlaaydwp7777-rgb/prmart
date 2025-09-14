
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
import { AUTH_STRINGS } from "@/lib/string-constants";

export function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />;
  }

  if (user) {
    const userInitial = user.displayName ? user.displayName.charAt(0) : (user.email ? user.email.charAt(0) : '');
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.photoURL ?? ''} alt={user.displayName ?? "user"} data-ai-hint="person face" />
              <AvatarFallback>{userInitial.toUpperCase()}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>
            <p>{user.displayName ?? AUTH_STRINGS.USER_MENU_GREETING}</p>
            <p className="text-xs font-normal text-muted-foreground">{user.email}</p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/seller/dashboard">{AUTH_STRINGS.DASHBOARD_LINK}</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account/settings">{AUTH_STRINGS.SETTINGS_LINK}</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={signOut} className="text-destructive focus:text-destructive">
            {AUTH_STRINGS.LOGOUT_LINK}
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
