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
}

export interface Category {
  name: string;
  icon: LucideIcon;
}

export interface HomePageContent {
  headline: string;
  headlineAccent: string;
  subheadline: string;
  categoriesHeadline: string;
  categoriesSubheadline: string;
  featuredPromptsHeadline: string;
  featuredPromptsSubheadline: string;
  ctaHeadline: string;
  ctaSubheadline: string;
}
