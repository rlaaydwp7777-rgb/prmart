"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { LoginDialog } from "@/components/auth/login-dialog";
import { UserMenu } from "@/components/auth/user-menu";
import { Skeleton } from "@/components/ui/skeleton";
import { BUTTONS } from "@/lib/string-constants";
import Link from "next/link";

export function AuthButtons() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  if (!isClient) {
    return <Skeleton className="h-10 w-36" />;
  }

  return isLoggedIn ? (
    <UserMenu onLogout={handleLogout} />
  ) : (
    <div className="flex items-center gap-2">
      <LoginDialog onLoginSuccess={handleLogin} />
      <Button asChild>
        <Link href="#">{BUTTONS.SIGNUP}</Link>
      </Button>
    </div>
  );
}
