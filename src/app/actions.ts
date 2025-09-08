
"use server";

import { generateProductDescription, GenerateProductDescriptionOutput } from "@/ai/flows/generate-product-description";
import { assessContentQuality, AssessContentQualityOutput } from "@/ai/flows/ai-content-quality-control";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const productSchema = z.object({
  title: z.string().min(5, "제목은 5자 이상이어야 합니다."),
  description: z.string().min(20, "설명은 20자 이상이어야 합니다."),
  category: z.string().min(1, "카테고리를 선택해주세요."),
  tags: z.string().min(1, "태그를 하나 이상 입력해주세요."),
  price: z.coerce.number().min(0, "가격은 0 이상의 숫자여야 합니다."),
  sellOnce: z.boolean().optional(),
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
    sellOnce: rawData.sellOnce === 'on'
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
        // Here you would typically save the product to the database.
        // For this demo, we'll just simulate success.
        console.log("Product approved and would be saved:", validatedFields.data);
        revalidatePath('/seller/dashboard'); // To clear cache and show updated product list
        return { 
            success: true,
            message: "상품이 성공적으로 제출되어 승인되었습니다!",
            qualityResult: qualityResult,
        };
    } else {
        // Product is not approved, send it to human review queue.
        console.log("Product not approved, sending to review queue:", validatedFields.data);
        return { 
            success: false,
            message: `콘텐츠 품질 기준을 충족하지 못해 수동 검토 대기열로 전송되었습니다.`,
            qualityResult: qualityResult,
            fields: validatedFields.data
        };
    }
  } catch (error) {
    console.error("Error assessing content quality:", error);
    return {
      success: false,
      message: "AI 품질 검수 중 오류가 발생했습니다. 다시 시도해주세요.",
      fields: validatedFields.data
    };
  }
}
