import type { Category, Prompt } from "./types";
import { Rocket, Code, LineChart, Plane, Users, Briefcase, Brush, BookOpen, Car, Home } from "lucide-react";
import { CATEGORY_NAMES } from "./string-constants";

export const CATEGORIES: Category[] = [
  { name: CATEGORY_NAMES.AI_PRODUCTION, icon: Rocket },
  { name: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, icon: Code },
  { name: CATEGORY_NAMES.INVESTMENT_FINTECH, icon: LineChart },
  { name: CATEGORY_NAMES.TRAVEL_LIFE, icon: Plane },
  { name: CATEGORY_NAMES.LIVING_PARENTING_TIPS, icon: Users },
  { name: CATEGORY_NAMES.BUSINESS_MARKETING, icon: Briefcase },
  { name: CATEGORY_NAMES.CREATION_DESIGN, icon: Brush },
  { name: CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT, icon: BookOpen },
  { name: CATEGORY_NAMES.MOBILITY_AUTOMOBILE, icon: Car },
  { name: CATEGORY_NAMES.LIFE_INFRA, icon: Home },
];

export const FEATURED_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Next.js 14 Boilerplate",
    author: "DevMaster",
    category: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION,
    price: 25000,
    rating: 4.9,
    reviews: 120,
    image: "https://picsum.photos/400/300?random=1",
    aiHint: "code terminal",
    rank: 1,
  },
  {
    id: "2",
    title: "Minimalist UI Kit",
    author: "PixelPerfect",
    category: CATEGORY_NAMES.CREATION_DESIGN,
    price: 35000,
    rating: 4.8,
    reviews: 95,
    image: "https://picsum.photos/400/300?random=2",
    aiHint: "design components",
    rank: 2,
  },
  {
    id: "3",
    title: "Email Marketing Sequences",
    author: "GrowthHacker",
    category: CATEGORY_NAMES.BUSINESS_MARKETING,
    price: 18000,
    rating: 4.9,
    reviews: 210,
    image: "https://picsum.photos/400/300?random=3",
    aiHint: "email inbox",
    rank: 3,
  },
  {
    id: "4",
    title: "분기별 주식 투자 리포트",
    author: "SEOGuru",
    category: CATEGORY_NAMES.INVESTMENT_FINTECH,
    price: 12000,
    rating: 5.0,
    reviews: 78,
    image: "https://picsum.photos/400/300?random=4",
    aiHint: "stock chart",
    rank: 4,
  }
];
