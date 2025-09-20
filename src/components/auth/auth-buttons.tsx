"use client";

import Link from "next/link";
import { useAuth } from "./auth-provider";
import { Button } from "../ui/button";
import { AUTH_STRINGS, SIDEBAR_STRINGS } from "@/lib/string-constants";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LayoutDashboard, LogOut, Settings } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export function AuthButtons() {
    const { user, loading, signOut } = useAuth();

    if (loading) {
        return <Skeleton className="h-10 w-24" />;
    }

    if (!user) {
        return (
            <div className="flex items-center gap-2">
                <Button variant="ghost" asChild>
                    <Link href="/login">{AUTH_STRINGS.LOGIN}</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">{BUTTONS.START_SELLING}</Link>
                </Button>
            </div>
        );
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.photoURL || `https://avatar.vercel.sh/${user.uid}.png`} alt={user.displayName || "user"} data-ai-hint="person face" />
                        <AvatarFallback>
                            {user.displayName?.charAt(0) || user.email?.charAt(0) || 'U'}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || AUTH_STRINGS.USER_MENU_GREETING}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href="/seller/dashboard">
                        <LayoutDashboard className="mr-2 h-4 w-4"/>
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
                <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4"/>
                    <span>{AUTH_STRINGS.LOGOUT_LINK}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
