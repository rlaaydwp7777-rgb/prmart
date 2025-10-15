
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { adminAppInstance, adminAuth, adminDb } from '@/lib/firebaseAdmin';
import { saveProduct as saveProductToDb, saveIdeaRequest as saveIdeaRequestToDb, saveProposal as saveProposalToDb, getCategories } from "@/lib/firebase/services";
import type { Prompt, IdeaRequest, Category, Proposal, User, Order } from "@/lib/types";
import { collection, getDocs, orderBy, limit, query as firestoreQuery, Timestamp } from "firebase/firestore";

// --- Form State ---
export type FormState = {
  message: string;
  success: boolean;
  issues?: string[];
  fields?: Record<string, string>;
};

// --- Helper Functions ---
async function verifyAdmin(token?: string): Promise<boolean> {
    if (!token) return false;
    if (!adminAuth) return false;
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);
        return decodedToken.role === 'admin';
    } catch (error) {
        return false;
    }
}


// --- Auth Actions ---
const signupSchema = z.object({
  uid: z.string().optional(), // For Google Sign in
  email: z.string().email("유효한 이메일 주소를 입력해주세요."),
  password: z.string().min(6, "비밀번호는 6자 이상이어야 합니다.").optional(),
  displayName: z.string().optional(), // For Google Sign in
  photoURL: z.string().optional(), // For Google Sign in
  isGoogleSignIn: z.string().optional(), // Flag for Google Sign in
});

export async function signUpAction(prevState: FormState, formData: FormData): Promise<FormState> {
  if (!adminAppInstance) {
    return { success: false, message: "[ACTION_SIGNUP_FAIL] Admin SDK not available." };
  }
  const rawData = Object.fromEntries(formData);
  const validatedFields = signupSchema.safeParse(rawData);
  
  if (!validatedFields.success) {
    return {
      success: false,
      message: "입력 값을 다시 확인해주세요.",
      issues: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat() : [],
    };
  }

  const { email, password, uid, displayName: googleDisplayName, photoURL, isGoogleSignIn } = validatedFields.data;

  try {
    const auth = getAuth(adminAppInstance);

    // Handle Google Sign-in user creation/update
    if (isGoogleSignIn === 'true' && uid && email) {
        const userRef = adminDb.collection("users").doc(uid);
        const userSnap = await userRef.get();
        if (!userSnap.exists()) {
             await auth.setCustomUserClaims(uid, { role: 'seller' });
             await userRef.set({
                email,
                displayName: googleDisplayName,
                photoURL: photoURL,
                role: 'seller', // 모든 사용자는 판매자로 가입
                createdAt: new Date().toISOString(),
             }, { merge: true });
        }
        return { success: true, message: "Google 로그인 사용자 정보가 확인되었습니다." };
    }


    if (!password) {
        return { success: false, message: "비밀번호를 입력해주세요." };
    }
    
    const displayName = email.split('@')[0];

    const userRecord = await auth.createUser({
        email,
        password,
        displayName,
    });
    
    // Set custom claim for seller role
    await auth.setCustomUserClaims(userRecord.uid, { role: 'seller' });
    
    if (adminDb) {
      const userData: Partial<User> = {
        email,
        displayName,
        role: 'seller', // 모든 사용자는 판매자로 가입
        createdAt: new Date().toISOString(),
      };

      await adminDb.collection("users").doc(userRecord.uid).set(userData);
    }

    return { success: true, message: "회원가입에 성공했습니다! 로그인해주세요." };
    
  } catch (error: any) {
    console.error("[ACTION_SIGNUP_FAIL]", error);
    let message = "회원가입 중 오류가 발생했습니다.";
    if (error.code === 'auth/email-already-exists') {
        message = "이미 사용 중인 이메일입니다.";
    }
    return {
      success: false,
      message,
    };
  }
}


// --- Product Actions ---
const productSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  description: z.string().min(20, "설명은 20자 이상이어야 합니다."),
  image: z.string().url("유효한 이미지 URL을 입력해주세요.").optional().or(z.literal('')),
  contentUrl: z.string().url("유효한 콘텐츠 URL을 입력해주세요.").optional().or(z.literal('')),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  price: z.coerce.number().min(0, "가격은 0 이상이어야 합니다."),
  tags: z.string().optional(),
  visibility: z.enum(['public', 'private', 'partial']),
  sellOnce: z.string().optional(),
  sellerId: z.string().min(1, "판매자 정보가 필요합니다."),
  author: z.string().min(1, "판매자 이름이 필요합니다."),
  sellerPhotoUrl: z.string().optional(),
});

export async function saveProductAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const token = cookies().get('firebaseIdToken')?.value;
  if (!token) {
    return { success: false, message: "상품을 등록하려면 로그인이 필요합니다." };
  }

  const rawData = Object.fromEntries(formData);
  const validatedFields = productSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "입력 값을 다시 확인해주세요.",
      issues: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat() : [],
    };
  }

  const { title, description, image, contentUrl, category, price, tags, visibility, sellOnce, sellerId, author, sellerPhotoUrl } = validatedFields.data;

  try {
    const categories: Category[] = await getCategories();
    const categorySlug = categories.find(c => c.name === category)?.slug || '';
    
    const productData = {
      title,
      description,
      image: image || `https://picsum.photos/seed/${encodeURIComponent(title)}/400/300`,
      aiHint: `${tags?.split(',')[0] || 'digital product'}`,
      contentUrl,
      category,
      categorySlug,
      price,
      tags: tags ? tags.split(',').map(t => t.trim()) : [],
      visibility,
      sellOnce: sellOnce === 'on',
      status: 'pending', // Add status field
      sellerId,
      author,
      sellerPhotoUrl,
    };
    
    await saveProductToDb(productData as Omit<Prompt, 'id' | 'createdAt' | 'updatedAt' | 'stats' | 'rating' | 'reviews'>);
    
    revalidatePath("/");
    revalidatePath("/seller/products");

    return { success: true, message: "상품이 성공적으로 등록되었습니다! 관리자 승인 후 판매가 시작됩니다." };
  } catch (error: any) {
    console.error("[ACTION_SAVE_PRODUCT_FAIL]", error);
    return { success: false, message: error.message || "상품 등록 중 오류가 발생했습니다." };
  }
}

// --- Idea Request Actions ---
const ideaRequestSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  description: z.string().min(10, "설명은 10자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  budget: z.coerce.number().min(0).optional(),
});

export async function createIdeaRequestAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const token = cookies().get('firebaseIdToken')?.value;
  if (!token) {
    return { success: false, message: "로그인이 필요합니다." };
  }

  const rawData = Object.fromEntries(formData);
  const validatedFields = ideaRequestSchema.safeParse(rawData);

  if (!validatedFields.success) {
     return {
      success: false,
      message: "입력 값을 다시 확인해주세요.",
      issues: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat() : [],
    };
  }

  const { title, description, category, budget } = validatedFields.data;

  try {
    const decodedToken = await adminAuth!.verifyIdToken(token);
    const author = decodedToken.name || decodedToken.email!;

    const categories: Category[] = await getCategories();
    const categorySlug = categories.find(c => c.name === category)?.slug || '';

    const requestData = {
      title,
      description,
      category,
      categorySlug,
      budget: budget || 0,
      author: author,
      authorId: decodedToken.uid,
      proposals: 0,
    };
    
    await saveIdeaRequestToDb(requestData as Omit<IdeaRequest, 'id' | 'createdAt' | 'isExample'>);

    revalidatePath('/requests');

    return { success: true, message: "아이디어 요청이 성공적으로 등록되었습니다!" };

  } catch(error: any) {
     console.error("[ACTION_CREATE_REQUEST_FAIL]", error);
     return { success: false, message: error.message || "아이디어 요청 등록 중 오류가 발생했습니다." };
  }
}


// --- Proposal Actions ---
const proposalSchema = z.object({
  content: z.string().min(10, "제안 내용은 10자 이상이어야 합니다."),
  requestId: z.string().min(1),
});

export async function createProposalAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const token = cookies().get('firebaseIdToken')?.value;
    if (!token) {
      return { success: false, message: "로그인이 필요합니다." };
    }

    const rawData = Object.fromEntries(formData);
    const validatedFields = proposalSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "입력 값을 다시 확인해주세요.",
            issues: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat() : [],
        };
    }

    const { content, requestId } = validatedFields.data;

    try {
        const decodedToken = await adminAuth!.verifyIdToken(token);
        
        const productUrlMatch = content.match(/https?:\/\/[^\s]*\/p\/([a-zA-Z0-9_-]+)/);
        const productId = productUrlMatch ? productUrlMatch[1] : undefined;

        const proposalData = {
            requestId,
            authorId: decodedToken.uid,
            authorName: decodedToken.name || decodedToken.email!,
            authorAvatar: decodedToken.picture || '',
            content,
            productId,
        };
        
        await saveProposalToDb(proposalData as Omit<Proposal, 'id' | 'createdAt' | 'status'>);
        
        revalidatePath(`/requests/${requestId}`);

        return { success: true, message: "제안이 성공적으로 제출되었습니다." };

    } catch(error: any) {
        console.error("[ACTION_CREATE_PROPOSAL_FAIL]", error);
        return { success: false, message: error.message || "제안 제출 중 오류가 발생했습니다." };
    }
}


// --- Admin Actions ---
export async function updateProductStatusAction(productId: string, status: 'approved' | 'rejected'): Promise<FormState> {
    const token = cookies().get('firebaseIdToken')?.value;
    const isAdmin = await verifyAdmin(token);
    if (!isAdmin) {
        return { success: false, message: "권한이 없습니다." };
    }

    if (!['approved', 'rejected'].includes(status)) {
        return { success: false, message: "잘못된 상태 값입니다." };
    }

    try {
        const productRef = adminDb.collection("products").doc(productId);
        await productRef.update({ status: status });
        revalidatePath('/admin/products');
        return { success: true, message: `상품 상태가 ${status}로 변경되었습니다.` };
    } catch (error) {
        console.error("Error updating product status:", error);
        return { success: false, message: "상품 상태 변경 중 오류가 발생했습니다." };
    }
}


export async function listAllUsers(): Promise<{ users: User[], error?: string }> {
    const token = cookies().get('firebaseIdToken')?.value;
    const isAdmin = await verifyAdmin(token);
    if (!isAdmin) {
        return { users: [], error: "권한이 없습니다." };
    }

    try {
        const userRecords = await adminAuth.listUsers(100); // Get up to 100 users
        const users = userRecords.users.map((user) => {
            const customClaims = (user.customClaims || {}) as { role?: string };
            return {
                uid: user.uid,
                email: user.email || "N/A",
                displayName: user.displayName || "N/A",
                role: customClaims.role || 'user',
                createdAt: user.metadata.creationTime,
            };
        });
        return { users };
    } catch (error) {
        console.error('Error listing users:', error);
        return { users: [], error: "사용자 목록을 불러오는 중 오류가 발생했습니다." };
    }
}

export async function listAllOrders(): Promise<{ orders?: Order[], error?: string }> {
    const token = cookies().get('firebaseIdToken')?.value;
    const isAdmin = await verifyAdmin(token);
    if (!isAdmin) {
        return { error: "권한이 없습니다." };
    }
    
    try {
        const q = firestoreQuery(collection(adminDb, "orders"), orderBy("createdAt", "desc"), limit(50));
        const snapshot = await getDocs(q);
        const orders = snapshot.docs.map(doc => {
            const data = doc.data();
            const serializedData: { [key: string]: any } = { id: doc.id };
             for (const key in data) {
                const value = data[key];
                if (value instanceof Timestamp) {
                    serializedData[key] = value.toDate().toISOString();
                } else {
                    serializedData[key] = value;
                }
            }
            return serializedData as Order;
        }).filter(Boolean);
        return { orders };
    } catch (error: any) {
        console.error(`Error fetching all orders:`, error);
        return { error: "주문 내역을 불러오는 중 오류가 발생했습니다." };
    }
}

export async function setUserRoleAction(uid: string, role: 'admin' | 'seller' | 'user'): Promise<FormState> {
     const token = cookies().get('firebaseIdToken')?.value;
    const isAdmin = await verifyAdmin(token);
    if (!isAdmin) {
        return { success: false, message: "권한이 없습니다." };
    }

    try {
        await adminAuth.setCustomUserClaims(uid, { role });
        await adminDb.collection("users").doc(uid).set({ role }, { merge: true });
        revalidatePath('/admin/users');
        return { success: true, message: "사용자 역할이 변경되었습니다." };
    } catch (error) {
        console.error('Error setting user role:', error);
        return { success: false, message: "역할 변경 중 오류가 발생했습니다." };
    }
}
