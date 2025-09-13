
"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { UserMenu } from "@/components/auth/user-menu";
import { Button } from "../ui/button";
import { BUTTONS } from "@/lib/string-constants";

export function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) {
    // You can return a skeleton loader here if you want
    return null;
  }

  return user ? (
    <UserMenu user={user} />
  ) : (
    <div className="flex items-center gap-2">
      <AuthDialog mode="login">
        <Button variant="ghost">{BUTTONS.LOGIN}</Button>
      </AuthDialog>
      <AuthDialog mode="signup">
        <Button>{BUTTONS.SIGNUP}</Button>
      </AuthDialog>
    </div>
  );
}
