import type { LucideIcon } from "lucide-react";

export interface Prompt {
  id: string;
  title: string;
  author: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  aiHint: string;
  rank?: number;
  isExample?: boolean;
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
  name:string;
  slug: string;
  icon: LucideIcon;
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
