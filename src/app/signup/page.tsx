'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import Link from 'next/link'
import { signupAction, type SignupFormState } from './actions'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AUTH_STRINGS, BUTTONS } from '@/lib/string-constants'
import { ArrowLeft, Loader2, Sparkles, TriangleAlert } from 'lucide-react'

const initialState: SignupFormState = {
  message: '',
  success: false,
}

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {BUTTONS.SIGNUP}
    </Button>
  )
}

export default function SignupPage() {
  const [state, formAction] = useActionState(signupAction, initialState)

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 p-4">
      <div className="w-full max-w-md">
        <div className="mb-4">
            <Button variant="ghost" asChild>
                <Link href="/">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    홈으로 돌아가기
                </Link>
            </Button>
        </div>
        <Card>
          <CardHeader className="text-center">
             <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-headline text-2xl">{AUTH_STRINGS.SIGNUP_TITLE}</CardTitle>
            <CardDescription>{AUTH_STRINGS.SIGNUP_DESCRIPTION}</CardDescription>
          </CardHeader>
          <CardContent>
            <form action={formAction} className="space-y-4">
              {state.message && (
                <Alert variant={state.success ? 'default' : 'destructive'}>
                  <TriangleAlert className="h-4 w-4" />
                  <AlertTitle>
                    {state.success ? '성공' : '오류'}
                  </AlertTitle>
                  <AlertDescription>{state.message}</AlertDescription>
                </Alert>
              )}
               <div className="space-y-2">
                <Label htmlFor="displayName">이름</Label>
                <Input
                  id="displayName"
                  name="displayName"
                  placeholder="홍길동"
                  required
                />
                 {state.issues?.find(issue => issue.includes('이름')) && <p className="text-sm text-destructive">{state.issues.find(issue => issue.includes('이름'))}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{AUTH_STRINGS.EMAIL_LABEL}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={AUTH_STRINGS.EMAIL_PLACEHOLDER}
                  required
                />
                 {state.issues?.find(issue => issue.includes('이메일')) && <p className="text-sm text-destructive">{state.issues.find(issue => issue.includes('이메일'))}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{AUTH_STRINGS.PASSWORD_LABEL}</Label>
                <Input id="password" name="password" type="password" required />
                 {state.issues?.find(issue => issue.includes('비밀번호는')) && <p className="text-sm text-destructive">{state.issues.find(issue => issue.includes('비밀번호는'))}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">{AUTH_STRINGS.CONFIRM_PASSWORD_LABEL}</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                />
                 {state.issues?.find(issue => issue.includes('일치하지')) && <p className="text-sm text-destructive">{state.issues.find(issue => issue.includes('일치하지'))}</p>}
              </div>
               <div className="space-y-2">
                <Label htmlFor="referralCode">{AUTH_STRINGS.REFERRAL_CODE_LABEL}</Label>
                <Input id="referralCode" name="referralCode" placeholder={AUTH_STRINGS.REFERRAL_CODE_PLACEHOLDER} />
              </div>
              <SubmitButton />
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-4 text-center">
             <div className="text-sm text-muted-foreground">
                {AUTH_STRINGS.ALREADY_HAVE_ACCOUNT}
                <Button variant="link" asChild className="p-1">
                    <Link href="/seller/dashboard"> {BUTTONS.LOGIN}</Link>
                </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
