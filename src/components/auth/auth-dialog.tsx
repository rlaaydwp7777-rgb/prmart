
"use client";

import { useAuth } from "@/components/auth/auth-provider";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AUTH_STRINGS, BUTTONS } from "@/lib/string-constants";
import { useEffect, useState, useTransition } from "react";
import { Chrome, Loader2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useActionState } from "react";
import { signInWithEmail, signUpWithEmail } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

type AuthDialogProps = {
  children: React.ReactNode;
  mode: "login" | "signup";
};

function AuthForm({ mode, setOpen }: { mode: "login" | "signup", setOpen: (open: boolean) => void }) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const action = mode === "login" ? signInWithEmail : signUpWithEmail;
  const [state, formAction, isFormPending] = useActionState(action, { success: false, message: "" });
  
  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? "성공" : "오류",
        description: state.message,
        variant: state.success ? "default" : "destructive",
      });
      if (state.success) {
        setOpen(false);
      }
    }
  }, [state, toast, setOpen]);

  const { signInWithGoogle } = useAuth();
  const handleGoogleSignIn = async () => {
    startTransition(async () => {
      try {
        await signInWithGoogle();
        setOpen(false);
      } catch (error) {
        // Toast is already shown in auth provider
      }
    });
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handleGoogleSignIn}
        className="w-full"
        variant="outline"
        disabled={isPending || isFormPending}
      >
        {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
            <Chrome className="mr-2 h-5 w-5" />
        )}
        {BUTTONS.CONTINUE_WITH_GOOGLE}
      </Button>
      <div className="relative">
        <Separator />
        <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
          OR
        </p>
      </div>
      <form action={formAction} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">{AUTH_STRINGS.EMAIL_LABEL}</Label>
          <Input id="email" name="email" type="email" placeholder={AUTH_STRINGS.EMAIL_PLACEHOLDER} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">{AUTH_STRINGS.PASSWORD_LABEL}</Label>
          <Input id="password" name="password" type="password" placeholder={AUTH_STRINGS.PASSWORD_PLACEHOLDER} required />
        </div>
        <Button type="submit" className="w-full" disabled={isFormPending}>
           {isFormPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {mode === "login" ? BUTTONS.LOGIN : BUTTONS.SIGNUP}
        </Button>
      </form>
    </div>
  );
}

export function AuthDialog({ children, mode }: AuthDialogProps) {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(mode);

  useEffect(() => {
    if (open) {
      setActiveTab(mode);
    }
  }, [open, mode]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <DialogHeader className="items-center">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{BUTTONS.LOGIN}</TabsTrigger>
              <TabsTrigger value="signup">{BUTTONS.SIGNUP}</TabsTrigger>
            </TabsList>
          </DialogHeader>
          <TabsContent value="login">
            <DialogHeader className="mb-4">
              <DialogTitle>{AUTH_STRINGS.WELCOME_BACK}</DialogTitle>
              <DialogDescription>{AUTH_STRINGS.LOGIN_DESCRIPTION}</DialogDescription>
            </DialogHeader>
            <AuthForm mode="login" setOpen={setOpen} />
          </TabsContent>
          <TabsContent value="signup">
             <DialogHeader className="mb-4">
              <DialogTitle>{AUTH_STRINGS.SIGNUP_TITLE}</DialogTitle>
              <DialogDescription>{AUTH_STRINGS.SIGNUP_DESCRIPTION}</DialogDescription>
            </DialogHeader>
            <AuthForm mode="signup" setOpen={setOpen} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
