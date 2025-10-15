import type { LucideIcon } from "lucide-react";

export type PromptVisibility = 'public' | 'private' | 'partial';
export type OrderStatus = 'created' | 'paid' | 'clearing_hold' | 'released' | 'refunded' | 'disputed' | 'chargeback';
export type ProductStatus = 'pending' | 'approved' | 'rejected';

export interface User {
    uid: string;
    email: string;
    displayName: string;
    photoURL?: string;
    role: 'user' | 'seller' | 'admin';
    referralCode?: string;
    referredBy?: string;
    createdAt: string;
    balances?: {
        available: number;
        pending: number;
        reserve: number;
    };
    kyc?: {
        status: 'verified' | 'pending' | 'rejected';
        [key: string]: any;
    };
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
  status: ProductStatus;
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
    buyerId: string;
    sellerId: string;
    productId: string;
    productTitle: string;
    
    priceGross: number; // 최종 결제 금액 (VAT 포함)
    priceNet: number;   // 공급가 (priceGross / 1.1)
    vat: number;        // 부가세
    
    referralCode?: string; // 사용된 추천인 코드
    
    pgFee: number;           // PG사 수수료
    platformFee: number;     // 플랫폼 수수료 (총액)
    referralFee: number;     // 추천인에게 지급될 보상
    sellerEarning: number;   // 판매자 최종 수익
    
    status: OrderStatus;
    
    holdUntil?: string;      // 정산 보류 만료 시점 (ISO String)
    disputeId?: string;      // 분쟁 ID
    refundReason?: string;   // 환불 사유

    orderDate: string; // 호환성을 위해 유지 (createdAt과 동일할 수 있음)
    createdAt: string;
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


export interface Wishlist {
    userId: string;
    productIds: string[];
}
