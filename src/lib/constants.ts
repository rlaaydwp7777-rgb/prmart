import type { Category, Prompt } from "./types";
import { Bot, Code, LineChart, VenetianMask, Film, Palette } from "lucide-react";
import { CATEGORY_NAMES } from "./string-constants";

export const CATEGORIES: Category[] = [
  { name: CATEGORY_NAMES.AI_CREATION, icon: Bot },
  { name: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, icon: Code },
  { name: CATEGORY_NAMES.INVESTMENT_FINTECH, icon: LineChart },
  { name: CATEGORY_NAMES.LIFE_KNOWHOW, icon: VenetianMask },
  { name: CATEGORY_NAMES.DESIGN_MEDIA, icon: Palette },
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
    aiHint: "code terminal"
  },
  {
    id: "2",
    title: "Minimalist UI Kit",
    author: "PixelPerfect",
    category: CATEGORY_NAMES.DESIGN_MEDIA,
    price: 35000,
    rating: 4.8,
    reviews: 95,
    image: "https://picsum.photos/400/300?random=2",
    aiHint: "design components"
  },
  {
    id: "3",
    title: "Email Marketing Sequences",
    author: "GrowthHacker",
    category: "마케팅",
    price: 18000,
    rating: 4.9,
    reviews: 210,
    image: "https://picsum.photos/400/300?random=3",
    aiHint: "email inbox"
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
    aiHint: "stock chart"
  }
];
