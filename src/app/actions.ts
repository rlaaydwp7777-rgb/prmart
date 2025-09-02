"use server";

import { generateProductDescription } from "@/ai/flows/generate-product-description";
import { assessContentQuality } from "@/ai/flows/ai-content-quality-control";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const productSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters long."),
  description: z.string().min(20, "Description must be at least 20 characters long."),
  category: z.string().min(1, "Please select a category."),
  tags: z.string().min(1, "Please enter at least one tag."),
  price: z.coerce.number().min(0, "Price must be a positive number."),
});

export type FormState = {
  message: string;
  success: boolean;
  fields?: Record<string, string>;
  issues?: string[];
  qualityResult?: {
    isApproved: boolean;
    reason: string;
    qualityScore: number;
  }
};

export async function generateDescriptionAction(title: string): Promise<{description: string | null; error: string | null}> {
  if (!title || title.trim().length < 5) {
    return { description: null, error: "Please enter a valid title (at least 5 characters)." };
  }
  try {
    const result = await generateProductDescription({ productTitle: title });
    return { description: result.productDescription, error: null };
  } catch (error) {
    console.error("Error generating description:", error);
    return { description: null, error: "Failed to generate description. Please try again." };
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
  });

  if (!validatedFields.success) {
    const errorData = validatedFields.error.flatten();
    return {
      success: false,
      message: "Form validation failed.",
      fields: Object.fromEntries(Object.entries(rawData).map(([key, value]) => [key, String(value)])),
      issues: errorData.fieldErrors ? Object.values(errorData.fieldErrors).flat() : ["Invalid data"],
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
            message: "Product submitted and approved successfully!",
            qualityResult: qualityResult,
        };
    } else {
        // Product is not approved, send it to human review queue.
        console.log("Product not approved, sending to review queue:", validatedFields.data);
        return { 
            success: false,
            message: `Product did not meet quality standards and has been sent for manual review.`,
            qualityResult: qualityResult,
        };
    }
  } catch (error) {
    console.error("Error assessing content quality:", error);
    return {
      success: false,
      message: "An unexpected error occurred while processing your submission. Please try again.",
    };
  }
}
