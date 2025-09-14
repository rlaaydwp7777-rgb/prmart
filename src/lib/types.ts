
import type { LucideIcon } from "lucide-react";

export interface Prompt {
  id: string;
  title: string;
  description?: string;
  author: string; 
  sellerId?: string;
  category: string; // 카테고리 이름
  categorySlug: string; // 카테고리 슬러그
  price: number;
  image: string;
  aiHint: string;
  tags?: string[];
  rank?: number;
  isExample?: boolean;
  createdAt?: string; // Changed from Timestamp to string
  updatedAt?: string; // Changed from Timestamp to string
  stats?: {
    views: number;
    likes: number;
    sales: number;
  };
  rating?: number;
  reviews?: number;
}

export interface IdeaRequest {
    id: string;
    title: string;
    description: string;
    author: string;
    category: string;
    categorySlug: string;
    budget: number;
    proposals: number;
    isExample?: boolean;
}

export interface SubCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name:string;
  slug: string;
  icon: string; // LucideIcon name as string
  subCategories: SubCategory[];
}

export interface HomePageContent {
  headline: string;
  subheadline: string | null;
  categoriesHeadline: string;
  categoriesSubheadline: string;
  featuredPromptsHeadline: string;
  featuredPromptsSubheadline: string;
  ctaHeadline: string;
  ctaSubheadline: string;
}
