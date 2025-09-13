
"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { UserMenu } from "@/components/auth/user-menu";
import { Button } from "../ui/button";
import { BUTTONS } from "@/lib/string-constants";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-10 w-24" />;
  }

  return user ? (
    <UserMenu user={user} />
  ) : (
    <div className="flex items-center gap-2">
      <Button variant="ghost" asChild>
        <Link href="/login">{BUTTONS.LOGIN}</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">{BUTTONS.SIGNUP}</Link>
      </Button>
    </div>
  );
}
