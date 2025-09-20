

"use server";

import { generateProductDescription, GenerateProductDescriptionOutput } from "@/ai/flows/generate-product-description";
import { assessContentQuality, AssessContentQualityOutput } from "@/ai/flows/ai-content-quality-control";
import { z } from "zod";
import { saveProduct, getCategories, saveIdeaRequest, saveProposal } from "@/lib/firebase/services";
import { revalidatePath } from "next/cache";


// --- Product & Request Actions ---

export type FormState = {
  message: string;
  success: boolean;
  fields?: Record<string, any>;
  issues?: string[];
  qualityResult?: AssessContentQualityOutput;
};

const productSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  description: z.string().min(20, "설명은 20자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  tags: z.string().min(1, "태그를 하나 이상 입력해주세요."),
  price: z.coerce.number().min(0, "가격은 0 이상의 숫자여야 합니다."),
  contentUrl: z.string().url("유효한 URL을 입력해주세요.").optional().or(z.literal('')),
  sellOnce: z.boolean().optional(),
  visibility: z.enum(['public', 'private', 'partial']),
  sellerId: z.string().min(1, "판매자 정보가 필요합니다."),
  author: z.string().min(1, "판매자 이름이 필요합니다."),
  sellerPhotoUrl: z.string().optional(),
});

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
    ...rawData,
    price: rawData.price,
    sellOnce: rawData.sellOnce === 'on',
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
        const { title, description, category, tags, price, sellOnce, sellerId, author, visibility, contentUrl, sellerPhotoUrl } = validatedFields.data;
        
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
          sellerPhotoUrl: sellerPhotoUrl || "",
          visibility,
          sellOnce,
          isExample: false,
          contentUrl: contentUrl || "",
        });

        revalidatePath('/seller/dashboard');
        revalidatePath('/seller/products');

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

const ideaRequestSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  description: z.string().min(20, "설명은 20자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  budget: z.coerce.number().min(0, "예산은 0 이상의 숫자여야 합니다.").optional(),
  author: z.string().min(1, "작성자 정보가 필요합니다."),
});

export async function createIdeaRequestAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const rawData = Object.fromEntries(formData.entries());
  
  const validatedFields = ideaRequestSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "입력 값을 다시 확인해주세요.",
      fields: rawData,
      issues: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat() : ["유효성 검사에 실패했습니다."],
    };
  }
  
  try {
    const { title, description, category, budget, author } = validatedFields.data;
    const categories = await getCategories();
    const categorySlug = categories.find(c => c.name === category)?.slug || "";
    
    await saveIdeaRequest({
        title,
        description,
        category,
        categorySlug,
        budget: budget || 0,
        author,
        proposals: 0,
    });
    
    revalidatePath('/requests');

    return {
        success: true,
        message: "아이디어 요청이 성공적으로 등록되었습니다!",
    };
  } catch (error) {
    console.error("Error in createIdeaRequestAction:", error);
    return {
      success: false,
      message: "요청 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
      fields: validatedFields.data
    };
  }
}

const proposalSchema = z.object({
  content: z.string().min(10, "제안 내용은 10자 이상이어야 합니다."),
  requestId: z.string(),
  authorId: z.string(),
  authorName: z.string(),
  authorAvatar: z.string().optional(),
});

export async function createProposalAction(prevState: FormState, formData: FormData): Promise<FormState> {
    const rawData = Object.fromEntries(formData.entries());
    const validatedFields = proposalSchema.safeParse(rawData);

    if (!validatedFields.success) {
        return {
            success: false,
            message: "입력 값을 다시 확인해주세요.",
            issues: validatedFields.error.flatten().fieldErrors ? Object.values(validatedFields.error.flatten().fieldErrors).flat() : ["유효성 검사에 실패했습니다."],
        };
    }

    try {
        await saveProposal({
            ...validatedFields.data,
            authorAvatar: validatedFields.data.authorAvatar || '',
        });

        revalidatePath(`/requests/${validatedFields.data.requestId}`);
        return {
            success: true,
            message: "제안이 성공적으로 등록되었습니다!",
        };
    } catch (error) {
        console.error("Error creating proposal:", error);
        return {
            success: false,
            message: "제안 등록 중 오류가 발생했습니다. 다시 시도해주세요.",
        };
    }
}
