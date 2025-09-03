"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/auth/login-dialog";
import { UserMenu } from "@/components/auth/user-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { BUTTONS } from "@/lib/string-constants";
import Link from "next/link";
import { useAuth } from "./auth-provider";

export function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) {
    return <Skeleton className="h-10 w-36" />;
  }

  return user ? (
    <UserMenu user={user} />
  ) : (
    <div className="flex items-center gap-2">
      <LoginDialog />
      <Button asChild>
        <Link href="#">{BUTTONS.SIGNUP}</Link>
      </Button>
    </div>
  );
}
