

import type { Category } from "./types";
import { Rocket, Code, LineChart, Plane, Users, Briefcase, Brush, BookOpen, Car, Home } from "lucide-react";
import { CATEGORY_NAMES } from "./string-constants";
import { slugify } from "./utils";

export const CATEGORIES: Category[] = [
  { 
    name: CATEGORY_NAMES.AI_PRODUCTION, 
    slug: slugify(CATEGORY_NAMES.AI_PRODUCTION),
    icon: Rocket,
    subCategories: [
      { name: "이미지 프롬프트 (Midjourney, Stable Diffusion)", slug: slugify("이미지 프롬프트 (Midjourney, Stable Diffusion)") },
      { name: "영상 프롬프트 (Sora, Pika Labs 등)", slug: slugify("영상 프롬프트 (Sora, Pika Labs 등)") },
      { name: "텍스트·문서 작성 (ChatGPT 보고서, 블로그 글)", slug: slugify("텍스트·문서 작성 (ChatGPT 보고서, 블로그 글)") },
      { name: "AI 업무 자동화 (API 활용, RPA 연계)", slug: slugify("AI 업무 자동화 (API 활용, RPA 연계)") },
      { name: "AI 툴 리뷰 & 비교", slug: slugify("AI 툴 리뷰 & 비교") },
    ]
  },
  { 
    name: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, 
    slug: slugify(CATEGORY_NAMES.DEVELOPMENT_AUTOMATION),
    icon: Code,
    subCategories: [
      { name: "웹/앱 개발 (Next.js, Python, Flutter)", slug: slugify("웹/앱 개발 (Next.js, Python, Flutter)") },
      { name: "데이터 분석 & 시각화 (SQL, Pandas, Tableau)", slug: slugify("데이터 분석 & 시각화 (SQL, Pandas, Tableau)") },
      { name: "업무 자동화 (엑셀 VBA, 파이썬 스크립트)", slug: slugify("업무 자동화 (엑셀 VBA, 파이썬 스크립트)") },
      { name: "클라우드/인프라 (AWS, Docker)", slug: slugify("클라우드/인프라 (AWS, Docker)") },
      { name: "보안/해킹 지식", slug: slugify("보안/해킹 지식") },
    ]
  },
  { 
    name: CATEGORY_NAMES.INVESTMENT_FINTECH, 
    slug: slugify(CATEGORY_NAMES.INVESTMENT_FINTECH),
    icon: LineChart,
    subCategories: [
        { name: "주식/ETF 리포트", slug: slugify("주식/ETF 리포트") },
        { name: "부동산 임장/투자 전략", slug: slugify("부동산 임장/투자 전략") },
        { name: "코인/블록체인 분석", slug: slugify("코인/블록체인 분석") },
        { name: "절세·짠테크", slug: slugify("절세·짠테크") },
        { name: "금융 트렌드 리포트", slug: slugify("금융 트렌드 리포트") },
    ]
  },
  { 
    name: CATEGORY_NAMES.TRAVEL_LIFE, 
    slug: slugify(CATEGORY_NAMES.TRAVEL_LIFE),
    icon: Plane,
    subCategories: [
        { name: "국내여행 코스", slug: slugify("국내여행 코스") },
        { name: "해외여행 플랜", slug: slugify("해외여행 플랜") },
        { name: "항공·숙박 꿀팁", slug: slugify("항공·숙박 꿀팁") },
        { name: "여행 사진/영상 노하우", slug: slugify("여행 사진/영상 노하우") },
        { name: "소규모 여행 커뮤니티", slug: slugify("소규모 여행 커뮤니티") },
    ]
  },
  { 
    name: CATEGORY_NAMES.LIVING_PARENTING_TIPS, 
    slug: slugify(CATEGORY_NAMES.LIVING_PARENTING_TIPS),
    icon: Users,
    subCategories: [
        { name: "육아 노하우 (잠재우기, 교육법)", slug: slugify("육아 노하우 (잠재우기, 교육법)") },
        { name: "생활 절약법", slug: slugify("생활 절약법") },
        { name: "건강/헬스 정보", slug: slugify("건강/헬스 정보") },
        { name: "집안일 자동화 꿀팁", slug: slugify("집안일 자동화 꿀팁") },
        { name: "음식/레시피 공유", slug: slugify("음식/레시피 공유") },
    ]
  },
  { 
    name: CATEGORY_NAMES.BUSINESS_MARKETING, 
    slug: slugify(CATEGORY_NAMES.BUSINESS_MARKETING),
    icon: Briefcase,
    subCategories: [
        { name: "SNS 마케팅 (인스타, 틱톡 운영법)", slug: slugify("SNS 마케팅 (인스타, 틱톡 운영법)") },
        { name: "브랜딩 & 디자인 (로고, 상세페이지)", slug: slugify("브랜딩 & 디자인 (로고, 상세페이지)") },
        { name: "세일즈/영업 전략", slug: slugify("세일즈/영업 전략") },
        { name: "템플릿·문서 양식 (PPT, 계약서)", slug: slugify("템플릿·문서 양식 (PPT, 계약서)") },
        { name: "스타트업/창업 노하우", slug: slugify("스타트업/창업 노하우") },
    ]
  },
  { 
    name: CATEGORY_NAMES.CREATION_DESIGN, 
    slug: slugify(CATEGORY_NAMES.CREATION_DESIGN),
    icon: Brush,
    subCategories: [
        { name: "일러스트·캐릭터 리소스", slug: slugify("일러스트·캐릭터 리소스") },
        { name: "UX/UI 디자인 팁", slug: slugify("UX/UI 디자인 팁") },
        { name: "사진 보정/촬영 기법", slug: slugify("사진 보정/촬영 기법") },
        { name: "영상 편집 프리셋", slug: slugify("영상 편집 프리셋") },
        { name: "폰트·컬러 팔레트 공유", slug: slugify("폰트·컬러 팔레트 공유") },
    ]
  },
  { 
    name: CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT, 
    slug: slugify(CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT),
    icon: BookOpen,
    subCategories: [
        { name: "외국어 학습법 (영어, 일본어 등)", slug: slugify("외국어 학습법 (영어, 일본어 등)") },
        { name: "자격증 대비 (IT 자격증, 회계 등)", slug: slugify("자격증 대비 (IT 자격증, 회계 등)") },
        { name: "글쓰기/스피치", slug: slugify("글쓰기/스피치") },
        { name: "뇌과학·학습법", slug: slugify("뇌과학·학습법") },
        { name: "온라인 강의 추천", slug: slugify("온라인 강의 추천") },
    ]
  },
  { 
    name: CATEGORY_NAMES.MOBILITY_AUTOMOBILE, 
    slug: slugify(CATEGORY_NAMES.MOBILITY_AUTOMOBILE),
    icon: Car,
    subCategories: [
        { name: "차량 구매 가이드 (국산, 수입)", slug: slugify("차량 구매 가이드 (국산, 수입)") },
        { name: "중고차 체크리스트", slug: slugify("중고차 체크리스트") },
        { name: "전기차/신기술 트렌드", slug: slugify("전기차/신기술 트렌드") },
        { name: "자동차 관리/정비", slug: slugify("자동차 관리/정비") },
        { name: "튜닝·액세서리", slug: slugify("튜닝·액세서리") },
    ]
  },
  { 
    name: CATEGORY_NAMES.LIFE_INFRA, 
    slug: slugify(CATEGORY_NAMES.LIFE_INFRA),
    icon: Home,
    subCategories: [
        { name: "아파트 시세/임장 리포트", slug: slugify("아파트 시세/임장 리포트") },
        { name: "전월세 계약 꿀팁", slug: slugify("전월세 계약 꿀팁") },
        { name: "인테리어 노하우", slug: slugify("인테리어 노하우") },
        { name: "지역별 생활 정보", slug: slugify("지역별 생활 정보") },
        { name: "부동산 정책 해설", slug: slugify("부동산 정책 해설") },
    ]
  },
];

export const CATEGORY_ICONS = CATEGORIES.reduce((acc, category) => {
    acc[category.name] = category.icon;
    return acc;
}, {} as Record<string, React.FC<any>>);

    