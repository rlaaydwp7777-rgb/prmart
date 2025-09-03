"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { AUTH_STRINGS } from "@/lib/string-constants";
import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";


interface UserMenuProps {
  user: User;
}

export function UserMenu({ user }: UserMenuProps) {
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "로그아웃 성공",
        description: "성공적으로 로그아웃되었습니다. 다음에 또 만나요!",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "로그아웃 실패",
        description: "로그아웃 중 오류가 발생했습니다.",
        variant: "destructive",
      });
    }
  };

  const getAvatarFallback = (name: string | null) => {
    if (!name) return "U";
    const parts = name.split(' ');
    if (parts.length > 1) {
      return parts[0][0] + parts[1][0];
    }
    return name[0];
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user.photoURL || `https://avatar.vercel.sh/${user.uid}.png`} alt="User avatar" data-ai-hint="person face" />
            <AvatarFallback>{getAvatarFallback(user.displayName)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.displayName || AUTH_STRINGS.USER_MENU_GREETING}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email || AUTH_STRINGS.USER_MENU_EMAIL}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/seller/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>{AUTH_STRINGS.DASHBOARD_LINK}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>{AUTH_STRINGS.SETTINGS_LINK}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{AUTH_STRINGS.LOGOUT_LINK}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
