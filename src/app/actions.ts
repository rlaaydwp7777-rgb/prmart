
"use server";

import { generateProductDescription, GenerateProductDescriptionOutput } from "@/ai/flows/generate-product-description";
import { assessContentQuality, AssessContentQualityOutput } from "@/ai/flows/ai-content-quality-control";
import { z } from "zod";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle } from "@/lib/firebase/auth";
import { FirebaseError } from "firebase/app";
import { saveProduct, getCategories } from "@/lib/firebase/services";
import { revalidatePath } from "next/cache";


// --- Auth Actions ---

const getFirebaseAuthErrorMessage = (error: FirebaseError) => {
    switch (error.code) {
        case 'auth/email-already-in-use':
            return '이미 사용 중인 이메일입니다.';
        case 'auth/invalid-email':
            return '유효하지 않은 이메일 형식입니다.';
        case 'auth/weak-password':
            return '비밀번호는 6자리 이상이어야 합니다.';
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential':
             return '이메일 또는 비밀번호를 잘못 입력했습니다.';
        case 'auth/popup-closed-by-user':
            return 'Google 로그인 팝업이 닫혔습니다. 다시 시도해주세요.';
        default:
            console.error("Firebase Auth Error:", error.code, error.message);
            return '인증 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
}


export type AuthState = {
    message: string;
    success: boolean;
    error?: string | null;
}

const signUpSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z.string().min(6, { message: "비밀번호는 6자 이상이어야 합니다." }),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["confirmPassword"],
});


export async function signUpWithEmailAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
    const validatedFields = signUpSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            message: "입력 값을 다시 확인해주세요.",
            error: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat()[0] : "유효성 검사에 실패했습니다.",
        };
    }
    
    const { email, password } = validatedFields.data;

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        return { success: true, message: "회원가입에 성공했습니다! 메인 페이지로 이동합니다." };
    } catch (error) {
        if (error instanceof FirebaseError) {
             return { success: false, message: "회원가입 실패", error: getFirebaseAuthErrorMessage(error) };
        }
        return { success: false, message: "회원가입 실패", error: "알 수 없는 오류가 발생했습니다." };
    }
}

const signInSchema = z.object({
  email: z.string().email({ message: "유효한 이메일을 입력해주세요." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }),
});

export async function signInWithEmailAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
     const validatedFields = signInSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedFields.success) {
        return {
            success: false,
            message: "입력 값을 다시 확인해주세요.",
            error: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat()[0] : "유효성 검사에 실패했습니다.",
        };
    }
    
    // This server action now only validates the form. The actual sign-in is done on the client.
    return { success: true, message: "유효성 검사 성공." };
}


export async function signInWithGoogleAction(): Promise<AuthState> {
    try {
        await signInWithGoogle();
        return { success: true, message: "Google 계정으로 로그인했습니다." };
    } catch (error) {
         if (error instanceof FirebaseError) {
             return { success: false, message: "Google 로그인 실패", error: getFirebaseAuthErrorMessage(error) };
        }
        return { success: false, message: "Google 로그인 실패", error: "알 수 없는 오류가 발생했습니다." };
    }
}


// --- Product Actions ---

const productSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  description: z.string().min(20, "설명은 20자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  tags: z.string().min(1, "태그를 하나 이상 입력해주세요."),
  price: z.coerce.number().min(0, "가격은 0 이상의 숫자여야 합니다."),
  sellOnce: z.boolean().optional(),
  sellerId: z.string().min(1, "판매자 정보가 필요합니다."),
  author: z.string().min(1, "판매자 이름이 필요합니다."),
});

export type FormState = {
  message: string;
  success: boolean;
  fields?: Record<string, any>;
  issues?: string[];
  qualityResult?: AssessContentQualityOutput;
};

export async function generateDescriptionAction(title: string): Promise<{data: GenerateProductDescriptionOutput | null; error: string | null}> {
  if (!title || title.trim().length < 5) {
    return { data: null, error: "유효한 제목을 5자 이상 입력해주세요." };
  }
  try {
    const result = await generateProductDescription({ productTitle: title });
    return { data: result, error: null };
  } catch (error) {
    console.error("Error generating description:", error);
    return { data: null, error: "AI 설명 생성에 실패했습니다. 다시 시도해주세요." };
  }
}

export async function registerProductAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());
  
  const validatedFields = productSchema.safeParse({
    title: rawData.title,
    description: rawData.description,
    category: rawData.category,
    tags: rawData.tags,
    price: rawData.price,
    sellOnce: rawData.sellOnce === 'on',
    sellerId: rawData.sellerId,
    author: rawData.author
  });

  if (!validatedFields.success) {
    return {
      success: false,
      message: "입력 값을 다시 확인해주세요.",
      fields: Object.fromEntries(Object.entries(rawData).map(([key, value]) => [key, String(value)])),
      issues: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat() : ["유효성 검사에 실패했습니다."],
    };
  }

  try {
    const qualityResult = await assessContentQuality({
      title: validatedFields.data.title,
      description: validatedFields.data.description,
      category: validatedFields.data.category,
      tags: validatedFields.data.tags.split(',').map(tag => tag.trim()),
    });

    if (qualityResult.isApproved) {
        const { title, description, category, tags, price, sellOnce, sellerId, author } = validatedFields.data;
        
        const categories = await getCategories();
        const categorySlug = categories.find(c => c.name === category)?.slug || "";
        const subCategorySlug = categories.flatMap(c => c.subCategories).find(sc => sc.name === category)?.slug || "";

        await saveProduct({
          title,
          description,
          category,
          categorySlug,
          subCategorySlug,
          tags: tags.split(',').map(tag => tag.trim()),
          price: Number(price),
          image: `https://picsum.photos/seed/${new Date().getTime()}/400/300`, // Placeholder image
          aiHint: tags.split(',').map(tag => tag.trim()).slice(0,2).join(' '),
          author,
          sellerId,
        });

        revalidatePath('/seller/dashboard');

        return { 
            success: true,
            message: "상품이 성공적으로 제출되어 승인되었습니다!",
            qualityResult: qualityResult,
        };
    } else {
        console.log("Product not approved, sending to review queue:", validatedFields.data);
        return { 
            success: false,
            message: `콘텐츠 품질 기준을 충족하지 못해 수동 검토 대기열로 전송되었습니다.`,
            qualityResult: qualityResult,
            fields: validatedFields.data
        };
    }
  } catch (error) {
    console.error("Error in registerProductAction:", error);
    return {
      success: false,
      message: "상품 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
      fields: validatedFields.data
    };
  }
}

    

    
