import type { LucideIcon } from "lucide-react";

export type PromptVisibility = 'public' | 'private' | 'partial';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    role: 'user';
    createdAt: string;
}

export interface Prompt {
  id: string;
  title: string;
  description?: string;
  author: string; 
  sellerId: string;
  sellerPhotoUrl?: string;
  category: string;
  categorySlug: string;
  subCategorySlug?: string;
  price: number;
  image: string;
  contentUrl?: string; // To store external link for product content
  aiHint: string;
  tags?: string[];
  rank?: number;
  isExample?: boolean;
  visibility: PromptVisibility;
  sellOnce?: boolean;
  createdAt: string; 
  updatedAt?: string;
  stats: {
    views: number;
    likes: number;
    sales: number;
  };
  rating: number;
  reviews: number;
}

export interface IdeaRequest {
    id: string;
    title: string;
    description: string;
    author: string;
    authorId: string;
    category: string;
    categorySlug: string;
    budget: number;
    proposals: number;
    isExample?: boolean;
    createdAt: string;
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
  icon: string;
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

export interface Order {
    id: string;
    orderDate: string;
    productId: string;
    productTitle: string;
    sellerId: string;
    buyerId: string;
    buyerName: string;
    buyerEmail: string;
    amount: number;
    status: 'paid' | 'refunded';
}

export interface SellerStats {
    totalRevenue: number;
    totalSales: number;
    productCount: number;
    averageRating: number;
    reviewCount: number;
}

export interface SellerProfile {
    sellerName: string;
    sellerBio?: string;
    photoUrl?: string;
    bankName?: string;
    accountNumber?: string;
    accountHolder?: string;
}

export interface Review {
    id: string;
    author: string;
    authorAvatar?: string;
    authorId: string;
    productId: string;
    productTitle: string;
    rating: number;
    content: string;
    createdAt: string;
}

export interface Wishlist {
    userId: string;
    productIds: string[];
}

export interface Proposal {
    id: string;
    requestId: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;
    content: string;
    productId?: string;
    createdAt: string;
    status: 'pending' | 'accepted';
}
