"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AUTH_STRINGS, BUTTONS } from "@/lib/string-constants";
import { Chrome, LogIn } from "lucide-react";
import React from "react";

interface LoginDialogProps {
  onLoginSuccess: () => void;
}

export function LoginDialog({ onLoginSuccess }: LoginDialogProps) {
  const [open, setOpen] = React.useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate successful login
    onLoginSuccess();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">{BUTTONS.LOGIN}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">{AUTH_STRINGS.WELCOME_BACK}</DialogTitle>
          <DialogDescription>
            {AUTH_STRINGS.LOGIN_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">{AUTH_STRINGS.EMAIL_LABEL}</Label>
              <Input type="email" id="email" placeholder={AUTH_STRINGS.EMAIL_PLACEHOLDER} required />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">{AUTH_STRINGS.PASSWORD_LABEL}</Label>
              <Input type="password" id="password" placeholder={AUTH_STRINGS.PASSWORD_PLACEHOLDER} required />
            </div>
          </div>
          <DialogFooter className="sm:flex-col sm:space-y-2">
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              {BUTTONS.LOGIN}
            </Button>
             <Button variant="outline" className="w-full">
              <Chrome className="mr-2 h-4 w-4" />
              {BUTTONS.CONTINUE_WITH_GOOGLE}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
