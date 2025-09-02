import type { Category, Prompt } from "./types";
import { Bot, Code, Mail, Palette, Search } from "lucide-react";

export const CATEGORIES: Category[] = [
  { name: "Development", icon: Code },
  { name: "Design", icon: Palette },
  { name: "Marketing", icon: Mail },
  { name: "SEO", icon: Search },
  { name: "AI Prompts", icon: Bot },
];

export const FEATURED_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Next.js 14 Boilerplate",
    author: "DevMaster",
    category: "Development",
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
    category: "Design",
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
    category: "Marketing",
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
    category: "SEO",
    price: 12000,
    rating: 5.0,
    reviews: 78,
    image: "https://picsum.photos/400/300?random=4",
    aiHint: "search analysis"
  }
];
