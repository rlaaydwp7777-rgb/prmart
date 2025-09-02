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
import { LayoutDashboard, LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { AUTH_STRINGS } from "@/lib/string-constants";

interface UserMenuProps {
  onLogout: () => void;
}

export function UserMenu({ onLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="https://picsum.photos/100/100" alt="User avatar" data-ai-hint="person face" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{AUTH_STRINGS.USER_MENU_GREETING}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {AUTH_STRINGS.USER_MENU_EMAIL}
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
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>{AUTH_STRINGS.SETTINGS_LINK}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{AUTH_STRINGS.LOGOUT_LINK}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
