
import type { Category, Prompt } from "./types";
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

const EXAMPLE_PROMPTS: Prompt[] = [
  // AI & 프로덕션
  { id: "ex-ai-1", title: "시네마틱 룩 Midjourney 프롬프트", author: "AI Artist", category: CATEGORY_NAMES.AI_PRODUCTION, price: 0, rating: 4.9, reviews: 15, image: "https://picsum.photos/400/300?random=101", aiHint: "cinematic photo", isExample: true },
  { id: "ex-ai-2", title: "ChatGPT 블로그 포스트 자동 생성기", author: "WriterBot", category: CATEGORY_NAMES.AI_PRODUCTION, price: 0, rating: 4.8, reviews: 22, image: "https://picsum.photos/400/300?random=102", aiHint: "writing text", isExample: true },
  { id: "ex-ai-3", title: "Sora용 단편 영화 시나리오 프롬프트", author: "FilmMakerAI", category: CATEGORY_NAMES.AI_PRODUCTION, price: 0, rating: 5.0, reviews: 8, image: "https://picsum.photos/400/300?random=103", aiHint: "movie scene", isExample: true },
  { id: "ex-ai-4", title: "Zapier & GPT 연동 자동화 가이드", author: "AutomationPro", category: CATEGORY_NAMES.AI_PRODUCTION, price: 0, rating: 4.7, reviews: 18, image: "https://picsum.photos/400/300?random=104", aiHint: "data flow", isExample: true },
  { id: "ex-ai-5", title: "실사풍 캐릭터 생성 Stable Diffusion 프롬프트", author: "DigitalHuman", category: CATEGORY_NAMES.AI_PRODUCTION, price: 0, rating: 4.9, reviews: 31, image: "https://picsum.photos/400/300?random=105", aiHint: "portrait woman", isExample: true },

  // 개발 & IT 자동화
  { id: "ex-dev-1", title: "Python 웹 스크레이핑 스크립트", author: "CodeWizard", category: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, price: 0, rating: 4.8, reviews: 45, image: "https://picsum.photos/400/300?random=106", aiHint: "python code", isExample: true },
  { id: "ex-dev-2", title: "엑셀 데이터 클리닝 VBA 매크로", author: "ExcelMaster", category: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, price: 0, rating: 4.9, reviews: 62, image: "https://picsum.photos/400/300?random=107", aiHint: "spreadsheet data", isExample: true },
  { id: "ex-dev-3", title: "Next.js & Firebase 인증 보일러플레이트", author: "FullstackDev", category: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, price: 0, rating: 5.0, reviews: 30, image: "https://picsum.photos/400/300?random=108", aiHint: "react code", isExample: true },
  { id: "ex-dev-4", title: "SQL 쿼리 성능 최적화 가이드", author: "DBA Hero", category: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, price: 0, rating: 4.7, reviews: 25, image: "https://picsum.photos/400/300?random=109", aiHint: "database schema", isExample: true },
  { id: "ex-dev-5", title: "Docker 기반 개발 환경 세팅", author: "DevOpsLife", category: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION, price: 0, rating: 4.8, reviews: 19, image: "https://picsum.photos/400/300?random=110", aiHint: "server terminal", isExample: true },

  // 재테크 & 투자
  { id: "ex-inv-1", title: "미국 기술주 성장성 분석 리포트", author: "AnalystKim", category: CATEGORY_NAMES.INVESTMENT_FINTECH, price: 0, rating: 4.9, reviews: 88, image: "https://picsum.photos/400/300?random=111", aiHint: "stock market", isExample: true },
  { id: "ex-inv-2", title: "부동산 투자 수익률 계산 엑셀 템플릿", author: "RealEstatePro", category: CATEGORY_NAMES.INVESTMENT_FINTECH, price: 0, rating: 5.0, reviews: 102, image: "https://picsum.photos/400/300?random=112", aiHint: "calculator money", isExample: true },
  { id: "ex-inv-3", title: "연말정산 필승 절세 전략 가이드", author: "TaxSaver", category: CATEGORY_NAMES.INVESTMENT_FINTECH, price: 0, rating: 4.8, reviews: 95, image: "https://picsum.photos/400/300?random=113", aiHint: "documents files", isExample: true },
  { id: "ex-inv-4", title: "비트코인 반감기 분석 및 전망", author: "CryptoWhale", category: CATEGORY_NAMES.INVESTMENT_FINTECH, price: 0, rating: 4.7, reviews: 55, image: "https://picsum.photos/400/300?random=114", aiHint: "bitcoin chart", isExample: true },
  { id: "ex-inv-5", title: "2024년 글로벌 금융 트렌드", author: "EconomyInsight", category: CATEGORY_NAMES.INVESTMENT_FINTECH, price: 0, rating: 4.9, reviews: 40, image: "https://picsum.photos/400/300?random=115", aiHint: "city skyline", isExample: true },

  // 여행 & 라이프
  { id: "ex-life-1", title: "제주도 3박 4일 동쪽 코스 추천", author: "Traveler", category: CATEGORY_NAMES.TRAVEL_LIFE, price: 0, rating: 4.9, reviews: 123, image: "https://picsum.photos/400/300?random=116", aiHint: "jeju island", isExample: true },
  { id: "ex-life-2", title: "유럽 한달살기 항공권 특가 정보", author: "SkyScanner", category: CATEGORY_NAMES.TRAVEL_LIFE, price: 0, rating: 4.8, reviews: 88, image: "https://picsum.photos/400/300?random=117", aiHint: "europe street", isExample: true },
  { id: "ex-life-3", title: "감성 여행사진 보정 프리셋 (라이트룸)", author: "PhotoGrapher", category: CATEGORY_NAMES.TRAVEL_LIFE, price: 0, rating: 5.0, reviews: 75, image: "https://picsum.photos/400/300?random=118", aiHint: "camera lens", isExample: true },
  { id: "ex-life-4", title: "나홀로 교토 2박 3일 여행 플랜", author: "SoloTravel", category: CATEGORY_NAMES.TRAVEL_LIFE, price: 0, rating: 4.9, reviews: 92, image: "https://picsum.photos/400/300?random=119", aiHint: "kyoto temple", isExample: true },
  { id: "ex-life-5", title: "전국 자전거길 여행 커뮤니티", author: "Rider", category: CATEGORY_NAMES.TRAVEL_LIFE, price: 0, rating: 4.7, reviews: 41, image: "https://picsum.photos/400/300?random=120", aiHint: "bicycle path", isExample: true },

  // 생활 & 육아 꿀팁
  { id: "ex-tip-1", title: "신생아 100일의 기적 수면교육법", author: "SuperMom", category: CATEGORY_NAMES.LIVING_PARENTING_TIPS, price: 0, rating: 5.0, reviews: 250, image: "https://picsum.photos/400/300?random=121", aiHint: "sleeping baby", isExample: true },
  { id: "ex-tip-2", title: "미니멀리즘 인테리어 가이드북", author: "SimpleLife", category: CATEGORY_NAMES.LIVING_PARENTING_TIPS, price: 0, rating: 4.9, reviews: 180, image: "https://picsum.photos/400/300?random=122", aiHint: "minimalist room", isExample: true },
  { id: "ex-tip-3", title: "매일 10분 홈트레이닝 루틴", author: "HealthCoach", category: CATEGORY_NAMES.LIVING_PARENTING_TIPS, price: 0, rating: 4.8, reviews: 130, image: "https://picsum.photos/400/300?random=123", aiHint: "home workout", isExample: true },
  { id: "ex-tip-4", title: "초간단 에어프라이어 레시피 모음", author: "ChefLee", category: CATEGORY_NAMES.LIVING_PARENTING_TIPS, price: 0, rating: 4.9, reviews: 210, image: "https://picsum.photos/400/300?random=124", aiHint: "air fryer", isExample: true },
  { id: "ex-tip-5", title: "통신비 절약을 위한 알뜰폰 비교", author: "SmartSaver", category: CATEGORY_NAMES.LIVING_PARENTING_TIPS, price: 0, rating: 4.7, reviews: 80, image: "https://picsum.photos/400/300?random=125", aiHint: "smartphone hand", isExample: true },

  // 비즈니스 & 마케팅
  { id: "ex-biz-1", title: "인스타그램 릴스 콘텐츠 기획 템플릿", author: "SocialGuru", category: CATEGORY_NAMES.BUSINESS_MARKETING, price: 0, rating: 4.9, reviews: 140, image: "https://picsum.photos/400/300?random=126", aiHint: "instagram feed", isExample: true },
  { id: "ex-biz-2", title: "투자 제안서 PPT 템플릿", author: "BizPro", category: CATEGORY_NAMES.BUSINESS_MARKETING, price: 0, rating: 5.0, reviews: 99, image: "https://picsum.photos/400/300?random=127", aiHint: "presentation slide", isExample: true },
  { id: "ex-biz-3", title: "퍼포먼스 마케팅 A/B 테스트 노하우", author: "Marketer", category: CATEGORY_NAMES.BUSINESS_MARKETING, price: 0, rating: 4.8, reviews: 76, image: "https://picsum.photos/400/300?random=128", aiHint: "marketing chart", isExample: true },
  { id: "ex-biz-4", title: "스타트업을 위한 정부지원사업 리스트", author: "StartupHelper", category: CATEGORY_NAMES.BUSINESS_MARKETING, price: 0, rating: 4.9, reviews: 110, image: "https://picsum.photos/400/300?random=129", aiHint: "business document", isExample: true },
  { id: "ex-biz-5", title: "세일즈 콜드메일 템플릿 모음", author: "SalesKing", category: CATEGORY_NAMES.BUSINESS_MARKETING, price: 0, rating: 4.7, reviews: 65, image: "https://picsum.photos/400/300?random=130", aiHint: "email inbox", isExample: true },

  // 창작 & 디자인
  { id: "ex-design-1", title: "상업용 무료 폰트 모음집", author: "FontMaster", category: CATEGORY_NAMES.CREATION_DESIGN, price: 0, rating: 5.0, reviews: 300, image: "https://picsum.photos/400/300?random=131", aiHint: "typography design", isExample: true },
  { id: "ex-design-2", title: "피그마 UI 디자인 시스템 템플릿", author: "UIDesigner", category: CATEGORY_NAMES.CREATION_DESIGN, price: 0, rating: 4.9, reviews: 180, image: "https://picsum.photos/400/300?random=132", aiHint: "design components", isExample: true },
  { id: "ex-design-3", title: "다빈치 리졸브 영상 색보정 LUT", author: "Colorist", category: CATEGORY_NAMES.CREATION_DESIGN, price: 0, rating: 4.8, reviews: 120, image: "https://picsum.photos/400/300?random=133", aiHint: "color palette", isExample: true },
  { id: "ex-design-4", title: "웹소설 표지 디자인 레퍼런스", author: "BookCoverArt", category: CATEGORY_NAMES.CREATION_DESIGN, price: 0, rating: 4.7, reviews: 90, image: "https://picsum.photos/400/300?random=134", aiHint: "fantasy book", isExample: true },
  { id: "ex-design-5", title: "귀여운 동물 캐릭터 일러스트 소스", author: "Illustrator", category: CATEGORY_NAMES.CREATION_DESIGN, price: 0, rating: 4.9, reviews: 250, image: "https://picsum.photos/400/300?random=135", aiHint: "cute cat", isExample: true },

  // 학습 & 자기계발
  { id: "ex-learn-1", title: "개발자를 위한 영어회화 표현집", author: "EngDev", category: CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT, price: 0, rating: 4.8, reviews: 95, image: "https://picsum.photos/400/300?random=136", aiHint: "learning english", isExample: true },
  { id: "ex-learn-2", title: "정보처리기사 실기 요약 노트", author: "CertMaster", category: CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT, price: 0, rating: 4.9, reviews: 150, image: "https://picsum.photos/400/300?random=137", aiHint: "taking notes", isExample: true },
  { id: "ex-learn-3", title: "생산성을 높이는 노션 활용법", author: "NotionExpert", category: CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT, price: 0, rating: 5.0, reviews: 220, image: "https://picsum.photos/400/300?random=138", aiHint: "notion workspace", isExample: true },
  { id: "ex-learn-4", title: "논리적 글쓰기를 위한 템플릿", author: "Writer", category: CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT, price: 0, rating: 4.7, reviews: 85, image: "https://picsum.photos/400/300?random=139", aiHint: "writing book", isExample: true },
  { id: "ex-learn-5", title: "코딩 테스트를 위한 알고리즘 정리", author: "AlgoKing", category: CATEGORY_NAMES.LEARNING_SELF_DEVELOPMENT, price: 0, rating: 4.9, reviews: 180, image: "https://picsum.photos/400/300?random=140", aiHint: "algorithm flowchart", isExample: true },

  // 모빌리티 & 자동차
  { id: "ex-car-1", title: "내 생애 첫 차 구매 가이드 (20대)", author: "CarLover", category: CATEGORY_NAMES.MOBILITY_AUTOMOBILE, price: 0, rating: 4.9, reviews: 110, image: "https://picsum.photos/400/300?random=141", aiHint: "new car", isExample: true },
  { id: "ex-car-2", title: "중고차 구매 시 필수 체크리스트", author: "UsedCarPro", category: CATEGORY_NAMES.MOBILITY_AUTOMOBILE, price: 0, rating: 5.0, reviews: 130, image: "https://picsum.photos/400/300?random=142", aiHint: "car inspection", isExample: true },
  { id: "ex-car-3", title: "테슬라 모델3 완벽 사용 설명서", author: "TeslaFan", category: CATEGORY_NAMES.MOBILITY_AUTOMOBILE, price: 0, rating: 4.8, reviews: 90, image: "https://picsum.photos/400/300?random=143", aiHint: "tesla car", isExample: true },
  { id: "ex-car-4", title: "셀프 세차 용품 및 노하우", author: "DetailingGod", category: CATEGORY_NAMES.MOBILITY_AUTOMOBILE, price: 0, rating: 4.7, reviews: 70, image: "https://picsum.photos/400/300?random=144", aiHint: "car wash", isExample: true },
  { id: "ex-car-5", title: "자동차 보험료 절약 꿀팁", author: "InsuranceMan", category: CATEGORY_NAMES.MOBILITY_AUTOMOBILE, price: 0, rating: 4.9, reviews: 100, image: "https://picsum.photos/400/300?random=145", aiHint: "insurance document", isExample: true },

  // 라이프 인프라 (부동산·주거)
  { id: "ex-infra-1", title: "서울 역세권 아파트 임장 리포트", author: "HomeSeeker", category: CATEGORY_NAMES.LIFE_INFRA, price: 0, rating: 4.9, reviews: 150, image: "https://picsum.photos/400/300?random=146", aiHint: "seoul apartment", isExample: true },
  { id: "ex-infra-2", title: "전세 사기 예방을 위한 계약 체크리스트", author: "SafeHome", category: CATEGORY_NAMES.LIFE_INFRA, price: 0, rating: 5.0, reviews: 200, image: "https://picsum.photos/400/300?random=147", aiHint: "contract document", isExample: true },
  { id: "ex-infra-3", title: "10평 원룸 인테리어 꿀팁 모음", author: "InteriorDesigner", category: CATEGORY_NAMES.LIFE_INFRA, price: 0, rating: 4.8, reviews: 120, image: "https://picsum.photos/400/300?random=148", aiHint: "small room", isExample: true },
  { id: "ex-infra-4", title: "LH/SH 청년 주택 청약 가이드", author: "MyHome", category: CATEGORY_NAMES.LIFE_INFRA, price: 0, rating: 4.9, reviews: 180, image: "https://picsum.photos/400/300?random=149", aiHint: "house keys", isExample: true },
  { id: "ex-infra-5", title: "2024년 부동산 정책 해설집", author: "PolicyAnalyst", category: CATEGORY_NAMES.LIFE_INFRA, price: 0, rating: 4.7, reviews: 80, image: "https://picsum.photos/400/300?random=150", aiHint: "government building", isExample: true },
];

export const FEATURED_PROMPTS: Prompt[] = [
  {
    id: "1",
    title: "Next.js 14 Boilerplate",
    author: "DevMaster",
    category: CATEGORY_NAMES.DEVELOPMENT_AUTOMATION,
    price: 0,
    rating: 4.9,
    reviews: 120,
    image: "https://picsum.photos/400/300?random=1",
    aiHint: "code terminal",
    rank: 1,
    isExample: true,
  },
  {
    id: "2",
    title: "Minimalist UI Kit",
    author: "PixelPerfect",
    category: CATEGORY_NAMES.CREATION_DESIGN,
    price: 0,
    rating: 4.8,
    reviews: 95,
    image: "https://picsum.photos/400/300?random=2",
    aiHint: "design components",
    rank: 2,
    isExample: true,
  },
  {
    id: "3",
    title: "Email Marketing Sequences",
    author: "GrowthHacker",
    category: CATEGORY_NAMES.BUSINESS_MARKETING,
    price: 0,
    rating: 4.9,
    reviews: 210,
    image: "https://picsum.photos/400/300?random=3",
    aiHint: "email inbox",
    rank: 3,
    isExample: true,
  },
  {
    id: "4",
    title: "분기별 주식 투자 리포트",
    author: "SEOGuru",
    category: CATEGORY_NAMES.INVESTMENT_FINTECH,
    price: 0,
    rating: 5.0,
    reviews: 78,
    image: "https://picsum.photos/400/300?random=4",
    aiHint: "stock chart",
    rank: 4,
    isExample: true,
  },
  ...EXAMPLE_PROMPTS,
].map((p, index) => ({ 
  ...p, 
  id: p.isExample ? p.id : `${p.id}-${index}`, // Ensure unique IDs
  categorySlug: slugify(p.category)
}));

    