// src/components/auth/auth-buttons.tsx
"use client";

import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { AUTH_STRINGS } from "@/lib/string-constants";
import { Skeleton } from "../ui/skeleton";
import { Gift } from "lucide-react";

export function AuthButtons() {
    const { user, loading, signOut } = useAuth();

    if (loading) {
        return <Skeleton className="h-10 w-24" />;
    }

    if (user) {
        // @ts-ignore - customAttributes are not part of the default user type but are present on our user objects
        const isSeller = user.reloadUserInfo?.customAttributes?.role === 'seller';
        // @ts-ignore
        const isAdmin = user.reloadUserInfo?.customAttributes?.role === 'admin';

        return (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={user.photoURL || `https://avatar.vercel.sh/${user.uid}.png`} alt={user.displayName || "user"} />
                            <AvatarFallback>{(user.displayName || user.email || "U").charAt(0)}</AvatarFallback>
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
                        <Link href="/account">계정 정보</Link>
                    </DropdownMenuItem>
                     {(isSeller || isAdmin) && (
                         <DropdownMenuItem asChild>
                           <Link href="/seller">판매자 센터</Link>
                        </DropdownMenuItem>
                    )}
                    {isAdmin && (
                        <DropdownMenuItem asChild>
                            <Link href="/admin">관리자 페이지</Link>
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuItem asChild>
                        <Link href="/account/referrals" className="flex items-center">
                            <Gift className="mr-2 h-4 w-4" />
                            친구 초대 & 리워드
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut}>
                        {AUTH_STRINGS.LOGOUT_LINK}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }

    return (
        <div className="flex items-center gap-2">
            <Button variant="ghost" asChild>
                <Link href="/login">{AUTH_STRINGS.LOGIN}</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">{AUTH_STRINGS.SIGNUP}</Link>
            </Button>
        </div>
    );
}