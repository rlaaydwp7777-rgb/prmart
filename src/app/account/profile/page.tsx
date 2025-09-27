// src/app/account/profile/page.tsx
"use client";

import * as React from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ACCOUNT_STRINGS } from "@/lib/string-constants";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, loading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // In a real app, you would handle profile updates here.
    toast({
        title: "성공",
        description: "프로필이 업데이트되었습니다. (데모)",
    });
  };
  
  if (loading) {
    return (
        <Card>
            <CardHeader>
                <Skeleton className="h-8 w-32" />
                <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-10 w-full" />
                </div>
                 <Skeleton className="h-10 w-32" />
            </CardContent>
        </Card>
    )
  }

  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>{ACCOUNT_STRINGS.SETTINGS_PROFILE_TITLE}</CardTitle>
          <CardDescription>{ACCOUNT_STRINGS.SETTINGS_PROFILE_DESC}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{ACCOUNT_STRINGS.SETTINGS_NAME_LABEL}</Label>
            <Input id="name" defaultValue={user.displayName || ""} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{ACCOUNT_STRINGS.SETTINGS_EMAIL_LABEL}</Label>
            <Input id="email" type="email" defaultValue={user.email || ""} disabled />
          </div>
          <Button type="submit">{ACCOUNT_STRINGS.SETTINGS_SAVE_BUTTON}</Button>
        </CardContent>
      </Card>
    </form>
  );
}
