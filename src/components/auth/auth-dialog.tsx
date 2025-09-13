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
import { useState } from "react";
import { Chrome } from "lucide-react";

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const { signInWithGoogle } = useAuth();

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      setOpen(false); // Close dialog on successful sign-in
    } catch (error) {
      console.error("Google Sign-In failed:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          {BUTTONS.LOGIN} / {BUTTONS.SIGNUP}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-headline">
            {AUTH_STRINGS.SIGNUP_TITLE}
          </DialogTitle>
          <DialogDescription className="text-center">
            {AUTH_STRINGS.SIGNUP_DESCRIPTION}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <Button
            onClick={handleGoogleSignIn}
            className="w-full"
            variant="default"
            size="lg"
          >
            <Chrome className="mr-2 h-5 w-5" />
            {BUTTONS.CONTINUE_WITH_GOOGLE}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
