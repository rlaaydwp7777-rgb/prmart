"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { AuthDialog } from "@/components/auth/auth-dialog";
import { UserMenu } from "@/components/auth/user-menu";

export function AuthButtons() {
  const { user, loading } = useAuth();

  if (loading) {
    // You can return a skeleton loader here if you want
    return null;
  }

  return user ? <UserMenu user={user} /> : <AuthDialog />;
}
