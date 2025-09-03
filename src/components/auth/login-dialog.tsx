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
import { Chrome, LogIn, TriangleAlert } from "lucide-react";
import React from "react";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";


export function LoginDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "로그인 성공",
        description: "prmart에 오신 것을 환영합니다!",
      });
      setOpen(false);
    } catch (error: any) {
      console.error("Login error:", error);
      setError("로그인에 실패했습니다. 이메일 또는 비밀번호를 확인해주세요.");
    }
  };

  const handleGoogleLogin = async () => {
    setError(null);
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
       toast({
        title: "로그인 성공",
        description: "prmart에 오신 것을 환영합니다!",
      });
      setOpen(false);
    } catch (error: any) {
       console.error("Google login error:", error);
       setError("Google 로그인에 실패했습니다. 다시 시도해주세요.");
    }
  }

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
          {error && (
            <Alert variant="destructive" className="mb-4">
              <TriangleAlert className="h-4 w-4" />
              <AlertTitle>로그인 오류</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <div className="grid gap-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">{AUTH_STRINGS.EMAIL_LABEL}</Label>
              <Input 
                type="email" 
                id="email" 
                placeholder={AUTH_STRINGS.EMAIL_PLACEHOLDER} 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="password">{AUTH_STRINGS.PASSWORD_LABEL}</Label>
              <Input 
                type="password" 
                id="password" 
                placeholder={AUTH_STRINGS.PASSWORD_PLACEHOLDER} 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
          </div>
          <DialogFooter className="sm:flex-col sm:space-y-2">
            <Button type="submit" className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              {BUTTONS.LOGIN}
            </Button>
          </DialogFooter>
        </form>
         <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
            <Chrome className="mr-2 h-4 w-4" />
            {BUTTONS.CONTINUE_WITH_GOOGLE}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
