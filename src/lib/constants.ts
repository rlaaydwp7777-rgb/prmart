
import type { Category, Prompt } from "./types";
import { CATEGORY_NAMES } from "@/lib/string-constants";
import { slugify } from "./utils";

export const CATEGORIES: Category[] = [
  { 
    id: "cat-1",
    name: CATEGORY_NAMES.AI_PRODUCTION, 
    slug: "ai-and-production",
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
    slug: "development-it-automation",
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
    slug: "investment-fintech",
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
    id: "cat-4",
    name: CATEGORY_NAMES.BUSINESS_MARKETING, 
    slug: "business-marketing",
    icon: "Briefcase",
    subCategories: [
        { id: "sub-4-1", name: "콘텐츠/SNS 마케팅", slug: slugify("콘텐츠/SNS 마케팅") },
        { id: "sub-4-2", name: "광고 운영 (GA, 메타)", slug: slugify("광고 운영 (GA, 메타)") },
        { id: "sub-4-3", "name": "사업 계획서/제안서", "slug": slugify("사업 계획서/제안서") },
        { id: "sub-4-4", name: "브랜딩/퍼스널 브랜딩", slug: slugify("브랜딩/퍼스널 브랜딩") },
        { id: "sub-4-5", name: "기타", slug: slugify("기타 비즈니스 마케팅") },
    ]
  },
    { 
    id: "cat-5",
    name: CATEGORY_NAMES.CREATION_DESIGN, 
    slug: "creation-design",
    icon: "Brush",
    subCategories: [
        { id: "sub-5-1", name: "UX/UI 디자인 리소스", slug: slugify("UX/UI 디자인 리소스") },
        { id: "sub-5-2", name: "PPT/Keynote 템플릿", slug: slugify("PPT/Keynote 템플릿") },
        { id: "sub-5-3", name: "영상 편집 템플릿", slug: slugify("영상 편집 템플릿") },
        { id: "sub-5-4", name: "그래픽 디자인 소스", slug: slugify("그래픽 디자인 소스") },
        { id: "sub-5-5", name: "기타", slug: slugify("기타 창작 디자인") },
    ]
  },
  { 
    id: "cat-6",
    name: CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT, 
    slug: "learning-self-development",
    icon: "BookOpen",
    subCategories: [
      { id: "sub-6-1", name: "직무 스킬업", slug: slugify("직무 스킬업") },
      { id: "sub-6-2", name: "외국어 학습 자료", slug: slugify("외국어 학습 자료") },
      { id: "sub-6-3", name: "자격증/시험 대비", slug: slugify("자격증/시험 대비") },
      { id: "sub-6-4", name: "학습 노하우/방법론", slug: slugify("학습 노하우/방법론") },
      { id: "sub-6-5", name: "기타", slug: slugify("기타 학습 자기계발") },
    ]
  },
  { 
    id: "cat-7",
    name: CATEGORY_NAMES.TRAVEL_LIFE, 
    slug: "travel-life",
    icon: "Plane",
    subCategories: [
      { id: "sub-7-1", name: "효율적인 여행 계획", slug: slugify("효율적인 여행 계획") },
      { id: "sub-7-2", name: "알뜰 여행 꿀팁", slug: slugify("알뜰 여행 꿀팁") },
      { id: "sub-7-3", name: "테마별 여행 코스", slug: slugify("테마별 여행 코스") },
      { id: "sub-7-4", name: "여행 사진/영상 보정", slug: slugify("여행 사진/영상 보정") },
      { id: "sub-7-5", name: "기타", slug: slugify("기타 여행 라이프") },
    ]
  },
  { 
    id: "cat-8",
    name: CATEGORY_NAMES.LIVING_PARENTING_TIPS, 
    slug: "living-parenting-tips",
    icon: "Users",
    subCategories: [
      { id: "sub-8-1", name: "육아 노하우/템플릿", slug: slugify("육아 노하우/템플릿") },
      { id: "sub-8-2", name: "건강 및 식단 관리", slug: slugify("건강 및 식단 관리") },
      { id: "sub-8-3", name: "현명한 절약 비법", slug: slugify("현명한 절약 비법") },
      { id: "sub-8-4", name: "반려동물 케어", slug: slugify("반려동물 케어") },
      { id: "sub-8-5", name: "기타", slug: slugify("기타 생활 노하우") },
    ]
  },
  { 
    id: "cat-9",
    name: CATEGORY_NAMES.MOBILITY_AUTOMOBILE, 
    slug: "mobility-automobile",
    icon: "Car",
    subCategories: [
      { id: "sub-9-1", name: "신차/중고차 구매가이드", slug: slugify("신차/중고차 구매가이드") },
      { id: "sub-9-2", name: "차량 관리 및 정비", slug: slugify("차량 관리 및 정비") },
      { id: "sub-9-3", name: "전기차 트렌드 및 보조금", slug: slugify("전기차 트렌드 및 보조금") },
      { id: "sub-9-4", name: "미래 모빌리티 리포트", slug: slugify("미래 모빌리티 리포트") },
      { id: "sub-9-5", name: "기타", slug: slugify("기타 모빌리티 자동차") },
    ]
  },
  { 
    id: "cat-10",
    name: CATEGORY_NAMES.LIFE_INFRA, 
    slug: "life-infra",
    icon: "Home",
    subCategories: [
      { id: "sub-10-1", name: "부동산 임장 보고서", slug: slugify("부동산 임장 보고서") },
      { id: "sub-10-2", name: "청약/대출 가이드", slug: slugify("청약/대출 가이드") },
      { id: "sub-10-3", name: "인테리어/가구 노하우", slug: slugify("인테리어/가구 노하우") },
      { id: "sub-10-4", name: "정부 정책/지원금 정보", slug: slugify("정부 정책/지원금 정보") },
      { id: "sub-10-5", name: "기타", slug: slugify("기타 라이프 인프라") },
    ]
  },
];

const generateExamplePrompts = (): Prompt[] => {
    let prompts: Prompt[] = [];
    let rankCounter = 1;
    CATEGORIES.forEach(category => {
        for (let i = 1; i <= 5; i++) {
            const promptId = `ex-${category.slug}-${i}`;
            prompts.push({
                id: promptId,
                title: `${category.name} 예제 상품 #${i}`,
                description: `이 상품은 '${category.name}'에 대한 심도 있는 노하우와 실용적인 템플릿을 제공합니다.`,
                author: "prmart 전문가",
                category: category.name,
                categorySlug: category.slug,
                price: Math.floor(Math.random() * 30000) + 10000,
                image: `https://picsum.photos/seed/${promptId}/400/300`,
                aiHint: `${category.slug.split('-')[0]} content`,
                tags: [category.name, "예제"],
                rank: rankCounter <= 10 ? rankCounter++ : undefined,
                isExample: true,
                createdAt: new Date().toISOString(),
                stats: {
                    views: Math.floor(Math.random() * 2000) + 100,
                    likes: Math.floor(Math.random() * 300) + 10,
                    sales: Math.floor(Math.random() * 100) + 5,
                },
                rating: parseFloat((Math.random() * (5.0 - 4.5) + 4.5).toFixed(1)),
                reviews: Math.floor(Math.random() * 50) + 5,
            });
        }
    });
    return prompts;
};

export const EXAMPLE_PROMPTS: Prompt[] = generateExamplePrompts();

