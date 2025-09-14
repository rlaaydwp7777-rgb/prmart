
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
      { id: "sub-1-1", name: "이미지 프롬프트 (Midjourney, Stable Diffusion)", slug: slugify("이미지 프롬프트 (Midjourney, Stable Diffusion)") },
      { id: "sub-1-2", name: "영상 프롬프트 (Sora, Pika Labs 등)", slug: slugify("영상 프롬프트 (Sora, Pika Labs 등)") },
      { id: "sub-1-3", name: "텍스트·문서 작성 (ChatGPT 보고서, 블로그 글)", slug: slugify("텍스트·문서 작성 (ChatGPT 보고서, 블로그 글)") },
      { id: "sub-1-4", name: "AI 업무 자동화 (API 활용, RPA 연계)", slug: slugify("AI 업무 자동화 (API 활용, RPA 연계)") },
      { id: "sub-1-5", name: "AI 툴 리뷰 & 비교", slug: slugify("AI 툴 리뷰 & 비교") },
    ]
  },
  { 
    id: "cat-2",
    name: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, 
    slug: slugify(CATEGORY_NAMES.DEVELOPMENT_AUTOMATION),
    icon: "Code",
    subCategories: [
      { id: "sub-2-1", name: "웹/앱 개발 (Next.js, Python, Flutter)", slug: slugify("웹/앱 개발 (Next.js, Python, Flutter)") },
      { id: "sub-2-2", name: "데이터 분석 & 시각화 (SQL, Pandas, Tableau)", slug: slugify("데이터 분석 & 시각화 (SQL, Pandas, Tableau)") },
      { id: "sub-2-3", name: "업무 자동화 (엑셀 VBA, 파이썬 스크립트)", slug: slugify("업무 자동화 (엑셀 VBA, 파이썬 스크립트)") },
      { id: "sub-2-4", name: "클라우드/인프라 (AWS, Docker)", slug: slugify("클라우드/인프라 (AWS, Docker)") },
      { id: "sub-2-5", name: "보안/해킹 지식", slug: slugify("보안/해킹 지식") },
    ]
  },
  { 
    id: "cat-3",
    name: CATEGORY_NAMES.INVESTMENT_FINTECH, 
    slug: slugify(CATEGORY_NAMES.INVESTMENT_FINTECH),
    icon: "LineChart",
    subCategories: [
        { id: "sub-3-1", name: "주식/ETF 리포트", slug: slugify("주식/ETF 리포트") },
        { id: "sub-3-2", name: "부동산 임장/투자 전략", slug: slugify("부동산 임장/투자 전략") },
        { id: "sub-3-3", name: "코인/블록체인 분석", slug: slugify("코인/블록체인 분석") },
        { id: "sub-3-4", name: "절세·짠테크", slug: slugify("절세·짠테크") },
        { id: "sub-3-5", name: "금융 트렌드 리포트", slug: slugify("금융 트렌드 리포트") },
    ]
  },
  { 
    id: "cat-4",
    name: CATEGORY_NAMES.TRAVEL_LIFE, 
    slug: slugify(CATEGORY_NAMES.TRAVEL_LIFE),
    icon: "Plane",
    subCategories: [
        { id: "sub-4-1", name: "국내여행 코스", slug: slugify("국내여행 코스") },
        { id: "sub-4-2", name: "해외여행 플랜", slug: slugify("해외여행 플랜") },
        { id: "sub-4-3", name: "항공·숙박 꿀팁", slug: slugify("항공·숙박 꿀팁") },
        { id: "sub-4-4", name: "여행 사진/영상 노하우", slug: slugify("여행 사진/영상 노하우") },
        { id: "sub-4-5", name: "소규모 여행 커뮤니티", slug: slugify("소규모 여행 커뮤니티") },
    ]
  },
  { 
    id: "cat-5",
    name: CATEGORY_NAMES.LIVING_PARENTING_TIPS, 
    slug: slugify(CATEGORY_NAMES.LIVING_PARENTING_TIPS),
    icon: "Users",
    subCategories: [
        { id: "sub-5-1", name: "육아 노하우 (잠재우기, 교육법)", slug: slugify("육아 노하우 (잠재우기, 교육법)") },
        { id: "sub-5-2", name: "생활 절약법", slug: slugify("생활 절약법") },
        { id: "sub-5-3", name: "건강/헬스 정보", slug: slugify("건강/헬스 정보") },
        { id: "sub-5-4", name: "집안일 자동화 꿀팁", slug: slugify("집안일 자동화 꿀팁") },
        { id: "sub-5-5", name: "음식/레시피 공유", slug: slugify("음식/레시피 공유") },
    ]
  },
  { 
    id: "cat-6",
    name: CATEGORY_NAMES.BUSINESS_MARKETING, 
    slug: slugify(CATEGORY_NAMES.BUSINESS_MARKETING),
    icon: "Briefcase",
    subCategories: [
        { id: "sub-6-1", name: "SNS 마케팅 (인스타, 틱톡 운영법)", slug: slugify("SNS 마케팅 (인스타, 틱톡 운영법)") },
        { id: "sub-6-2", name: "브랜딩 & 디자인 (로고, 상세페이지)", slug: slugify("브랜딩 & 디자인 (로고, 상세페이지)") },
        { id: "sub-6-3", name: "세일즈/영업 전략", slug: slugify("세일즈/영업 전략") },
        { id: "sub-6-4", name: "템플릿·문서 양식 (PPT, 계약서)", slug: slugify("템플릿·문서 양식 (PPT, 계약서)") },
        { id: "sub-6-5", name: "스타트업/창업 노하우", slug: slugify("스타트업/창업 노하우") },
    ]
  },
  { 
    id: "cat-7",
    name: CATEGORY_NAMES.CREATION_DESIGN, 
    slug: slugify(CATEGORY_NAMES.CREATION_DESIGN),
    icon: "Brush",
    subCategories: [
        { id: "sub-7-1", name: "일러스트·캐릭터 리소스", slug: slugify("일러스트·캐릭터 리소스") },
        { id: "sub-7-2", name: "UX/UI 디자인 팁", slug: slugify("UX/UI 디자인 팁") },
        { id: "sub-7-3", name: "사진 보정/촬영 기법", slug: slugify("사진 보정/촬영 기법") },
        { id: "sub-7-4", name: "영상 편집 프리셋", slug: slugify("영상 편집 프리셋") },
        { id: "sub-7-5", name: "폰트·컬러 팔레트 공유", slug: slugify("폰트·컬러 팔레트 공유") },
    ]
  },
  { 
    id: "cat-8",
    name: CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT, 
    slug: slugify(CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT),
    icon: "BookOpen",
    subCategories: [
        { id: "sub-8-1", name: "외국어 학습법 (영어, 일본어 등)", slug: slugify("외국어 학습법 (영어, 일본어 등)") },
        { id: "sub-8-2", name: "자격증 대비 (IT 자격증, 회계 등)", slug: slugify("자격증 대비 (IT 자격증, 회계 등)") },
        { id: "sub-8-3", name: "글쓰기/스피치", slug: slugify("글쓰기/스피치") },
        { id: "sub-8-4", name: "뇌과학·학습법", slug: slugify("뇌과학·학습법") },
        { id: "sub-8-5", name: "온라인 강의 추천", slug: slugify("온라인 강의 추천") },
    ]
  },
  { 
    id: "cat-9",
    name: CATEGORY_NAMES.MOBILITY_AUTOMOBILE, 
    slug: slugify(CATEGORY_NAMES.MOBILITY_AUTOMOBILE),
    icon: "Car",
    subCategories: [
        { id: "sub-9-1", name: "차량 구매 가이드 (국산, 수입)", slug: slugify("차량 구매 가이드 (국산, 수입)") },
        { id: "sub-9-2", name: "중고차 체크리스트", slug: slugify("중고차 체크리스트") },
        { id: "sub-9-3", name: "전기차/신기술 트렌드", slug: slugify("전기차/신기술 트렌드") },
        { id: "sub-9-4", name: "자동차 관리/정비", slug: slugify("자동차 관리/정비") },
        { id: "sub-9-5", name: "튜닝·액세서리", slug: slugify("튜닝·액세서리") },
    ]
  },
  { 
    id: "cat-10",
    name: CATEGORY_NAMES.LIFE_INFRA, 
    slug: slugify(CATEGORY_NAMES.LIFE_INFRA),
    icon: "Home",
    subCategories: [
        { id: "sub-10-1", name: "아파트 시세/임장 리포트", slug: slugify("아파트 시세/임장 리포트") },
        { id: "sub-10-2", name: "전월세 계약 꿀팁", slug: slugify("전월세 계약 꿀팁") },
        { id: "sub-10-3", name: "인테리어 노하우", slug: slugify("인테리어 노하우") },
        { id: "sub-10-4", name: "지역별 생활 정보", slug: slugify("지역별 생활 정보") },
        { id: "sub-10-5", name: "부동산 정책 해설", slug: slugify("부동산 정책 해설") },
    ]
  },
];
