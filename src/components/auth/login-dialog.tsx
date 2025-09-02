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
        <Button variant="outline">로그인</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline">다시 오신 것을 환영합니다</DialogTitle>
          <DialogDescription>
            대시보드와 구매 내역에 접근하려면 로그인하세요.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleLogin}>
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">이메일</Label>
              <Input type="email" id="email" placeholder="project@prmart.ai" required />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">비밀번호</Label>
              <Input type="password" id="password" placeholder="••••••••" required />
            </div>
          </div>
          <DialogFooter className="sm:flex-col sm:space-y-2">
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              로그인
            </Button>
             <Button variant="outline" className="w-full">
              <Chrome className="mr-2 h-4 w-4" />
              Google 계정으로 계속하기
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
