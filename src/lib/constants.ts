import type { Category, Prompt } from "./types";
import { Bot, Code, Mail, Palette, Search } from "lucide-react";
import { BUTTONS, CATEGORY_NAMES, PROMPT_CARD_STRINGS, HOME_STRINGS } from "./string-constants";

export const CATEGORIES: Category[] = [
  { name: CATEGORY_NAMES.DEVELOPMENT, icon: Code },
  { name: CATEGORY_NAMES.DESIGN, icon: Palette },
  { name: CATEGORY_NAMES.MARKETING, icon: Mail },
  { name: CATEGORY_NAMES.SEO, icon: Search },
  { name: CATEGORY_NAMES.AI_PROMPTS, icon: Bot },
];

export const FEATURED_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Next.js 14 Boilerplate",
    author: "DevMaster",
    category: CATEGORY_NAMES.DEVELOPMENT,
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
    category: CATEGORY_NAMES.DESIGN,
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
    category: CATEGORY_NAMES.MARKETING,
    price: 18000,
    rating: 4.9,
    reviews: 210,
    image: "https://picsum.photos/400/300?random=3",
    aiHint: "email inbox"
  },
  {
    id: "4",
    title: "SEO Audit Checklist",
    author: "SEOGuru",
    category: CATEGORY_NAMES.SEO,
    price: 12000,
    rating: 5.0,
    reviews: 78,
    image: "https://picsum.photos/400/300?random=4",
    aiHint: "search analysis"
  }
];
