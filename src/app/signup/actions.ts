'use server'

import { z } from 'zod'
import { auth } from '@/lib/firebase'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

export type SignupFormState = {
  message: string
  success: boolean
  issues?: string[]
  fields?: Record<string, string>
}

const signupSchema = z
  .object({
    displayName: z.string().min(2, '이름은 2자 이상이어야 합니다.'),
    email: z.string().email('유효한 이메일 주소를 입력해주세요.'),
    password: z.string().min(6, '비밀번호는 6자 이상이어야 합니다.'),
    confirmPassword: z.string(),
    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  })

export async function signupAction(
  prevState: SignupFormState,
  formData: FormData
): Promise<SignupFormState> {
  const rawData = Object.fromEntries(formData)
  const validatedFields = signupSchema.safeParse(rawData)

  if (!validatedFields.success) {
    return {
      success: false,
      message: '입력 값을 다시 확인해주세요.',
      fields: Object.fromEntries(
        Object.entries(rawData).map(([key, value]) => [key, String(value)])
      ),
      issues: validatedFields.error.flatten().fieldErrors
        ? Object.values(validatedFields.error.flatten().fieldErrors).flat()
        : ['유효성 검사에 실패했습니다.'],
    }
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      validatedFields.data.email,
      validatedFields.data.password
    )

    await updateProfile(userCredential.user, {
        displayName: validatedFields.data.displayName
    })

    // TODO: Implement referral code logic
    // 1. Find referrer by referralCode
    // 2. If referrer exists, update new user's profile with referrer_id
    // 3. This will be used later in payment processing to calculate commission.
    if (validatedFields.data.referralCode) {
      console.log(
        `User signed up with referral code: ${validatedFields.data.referralCode}`
      )
    }

    return {
      success: true,
      message: '회원가입이 성공적으로 완료되었습니다! 로그인 해주세요.',
    }
  } catch (error: any) {
    console.error('Signup error:', error)
    let errorMessage = '회원가입 중 오류가 발생했습니다. 다시 시도해주세요.'
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = '이미 사용 중인 이메일입니다.'
    }
    return {
      success: false,
      message: errorMessage,
      fields: validatedFields.data,
    }
  }
}
