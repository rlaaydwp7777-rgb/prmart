
import type { Category, Prompt } from "./types";
import { CATEGORY_NAMES } from "@/lib/string-constants";
import { slugify } from "./utils";

export const CATEGORIES: Category[] = [
  { 
    id: "cat-1",
    name: CATEGORY_NAMES.AI_PRODUCTION, 
    slug: slugify(CATEGORY_NAMES.AI_PRODUCTION),
    icon: "Rocket",
    subCategories: [
      { id: "sub-1-1", name: "ChatGPT 활용 프롬프트", slug: slugify("ChatGPT 활용 프롬프트") },
      { id: "sub-1-2", name: "이미지 생성 (미드저니, DALL-E)", slug: slugify("이미지 생성 (미드저니, DALL-E)") },
      { id: "sub-1-3", name: "영상/음악 생성 (Sora, Pika)", slug: slugify("영상/음악 생성 (Sora, Pika)") },
      { id: "sub-1-4", name: "업무 자동화 (RPA, Zapier)", slug: slugify("업무 자동화 (RPA, Zapier)") },
      { id: "sub-1-5", name: "기타", slug: slugify("기타 AI 생산성") },
    ]
  },
  { 
    id: "cat-2",
    name: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, 
    slug: slugify(CATEGORY_NAMES.DEVELOPMENT_AUTOMATION),
    icon: "Code",
    subCategories: [
      { id: "sub-2-1", name: "웹/앱 개발 템플릿", slug: slugify("웹/앱 개발 템플릿") },
      { id: "sub-2-2", name: "데이터 분석/시각화", slug: slugify("데이터 분석/시각화") },
      { id: "sub-2-3", name: "업무 자동화 스크립트", slug: slugify("업무 자동화 스크립트") },
      { id: "sub-2-4", name: "클라우드/인프라(IaC)", slug: slugify("클라우드/인프라(IaC)") },
       { id: "sub-2-5", name: "기타", slug: slugify("기타 개발 IT") },
    ]
  },
  { 
    id: "cat-3",
    name: CATEGORY_NAMES.INVESTMENT_FINTECH, 
    slug: slugify(CATEGORY_NAMES.INVESTMENT_FINTECH),
    icon: "LineChart",
    subCategories: [
        { id: "sub-3-1", name: "주식/ETF 트레이딩 전략", slug: slugify("주식/ETF 트레이딩 전략") },
        { id: "sub-3-2", name: "부동산 투자 리포트", slug: slugify("부동산 투자 리포트") },
        { id: "sub-3-3", name: "N잡/부업 노하우", slug: slugify("N잡/부업 노하우") },
        { id: "sub-3-4", name: "세금 및 절세 전략", slug: slugify("세금 및 절세 전략") },
        { id: "sub-3-5", name: "기타", slug: slugify("기타 재테크 투자") },
    ]
  },
  { 
    id: "cat-6",
    name: CATEGORY_NAMES.BUSINESS_MARKETING, 
    slug: slugify(CATEGORY_NAMES.BUSINESS_MARKETING),
    icon: "Briefcase",
    subCategories: [
        { id: "sub-6-1", name: "콘텐츠/SNS 마케팅", slug: slugify("콘텐츠/SNS 마케팅") },
        { id: "sub-6-2", name: "광고 운영 (GA, 메타)", slug: slugify("광고 운영 (GA, 메타)") },
        { id: "sub-6-3", "name": "사업 계획서/제안서", "slug": slugify("사업 계획서/제안서") },
        { id: "sub-6-4", name: "브랜딩/퍼스널 브랜딩", slug: slugify("브랜딩/퍼스널 브랜딩") },
        { id: "sub-6-5", name: "기타", slug: slugify("기타 비즈니스 마케팅") },
    ]
  },
  { 
    id: "cat-7",
    name: CATEGORY_NAMES.CREATION_DESIGN, 
    slug: slugify(CATEGORY_NAMES.CREATION_DESIGN),
    icon: "Brush",
    subCategories: [
        { id: "sub-7-1", name: "UX/UI 디자인 리소스", slug: slugify("UX/UI 디자인 리소스") },
        { id...