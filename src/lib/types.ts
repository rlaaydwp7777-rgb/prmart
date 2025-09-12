import type { LucideIcon } from "lucide-react";
import type { Timestamp } from "firebase/firestore";

export interface Prompt {
  id: string;
  title: string;
  description: string;
  author: string; // This should be a seller ID in the future
  sellerId?: string;
  category: string;
  categorySlug: string;
  price: number;
  image: string;
  aiHint: string;
  tags?: string[];
  rank?: number;
  isExample?: boolean;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  stats?: {
    views: number;
    likes: number;
    sales: number;
  };
  // Properties from old structure, for compatibility.
  rating?: number;
  reviews?: number;
}

export interface IdeaRequest {
    id: string;
    title: string;
    description: string;
    author: string;
    category: string;
    budget: number;
    proposals: number;
    isExample?: boolean;
}

export interface SubCategory {
  name: string;
  slug: string;
}

export interface Category {
  id: string;
  name:string;
  slug: string;
  icon?: string; // Icon name as string
  subCategories?: SubCategory[];
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

    

