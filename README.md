# prmart: AI 기반 디지털 자산 마켓플레이스

**prmart**는 AI 프롬프트, 개발 소스코드, 디자인 템플릿, 업무 자동화 노하우 등 모든 종류의 디지털 지식 자산을 거래할 수 있는 마이크로콘텐츠 마켓플레이스입니다. 이 프로젝트는 Next.js, Genkit AI, Firebase를 기반으로 구축되었습니다.

## 🚀 시작 가이드

### 1. 전제 조건

*   Node.js (v20 이상 권장)
*   npm 또는 pnpm

### 2. 환경 변수 설정

프로젝트 루트에 `.env` 파일을 생성하고 아래 변수들을 Firebase 프로젝트의 값으로 채워주세요.

```
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

# Genkit (Google AI Studio) Configuration
GEMINI_API_KEY=
```

### 3. 프로젝트 실행

```bash
# 1. 의존성 설치
npm install

# 2. Next.js 개발 서버 실행 (웹 애플리케이션)
npm run dev

# 3. Genkit 개발 서버 실행 (AI 기능) - 별도의 터미널에서 실행
npm run genkit:dev
```

-   웹 애플리케이션은 `http://localhost:9002` 에서 실행됩니다.
-   Genkit AI Flow 서버는 `http://localhost:3100` 에서 실행됩니다.

## 🛠️ 기술 스택

-   **프레임워크**: Next.js (App Router, 서버 컴포넌트)
-   **언어**: TypeScript
-   **스타일링**: Tailwind CSS, ShadCN/UI
-   **AI**: Genkit (Google AI)
-   **인증**: Firebase Authentication
-   **상태 관리**: React Hooks & Context API

## ✨ 주요 기능

-   **사용자 인증**: 이메일/비밀번호 및 Google 소셜 로그인을 지원합니다.
-   **상품 탐색**: 카테고리별, 검색을 통한 디지털 상품 탐색 기능을 제공합니다.
-   **상품 상세 정보**: 상품의 이미지, 설명, 가격, 리뷰 등 상세 정보를 볼 수 있습니다.
-   **판매자 대시보드**: 판매자가 상품을 등록하고 판매 현황을 분석할 수 있는 전용 대시보드입니다.
-   **AI 상품 등록 도우미**: 상품 제목만 입력하면 Genkit AI가 상품 설명, 카테고리, 태그, 가격을 자동으로 생성해주는 기능입니다.
-   **AI 콘텐츠 품질 검수**: 상품 등록 시 Genkit AI가 콘텐츠 품질을 평가하여 자동 승인하거나 수동 검토를 요청합니다.

## 📂 프로젝트 구조

```
src
├── ai/                    # Genkit AI 관련 파일
│   ├── flows/             # AI 핵심 로직 (Flows)
│   └── genkit.ts          # Genkit 초기 설정
│
├── app/                   # Next.js App Router
│   ├── (main)/            # 메인 레이아웃 (헤더/푸터 포함) 페이지 그룹
│   ├── seller/            # 판매자 전용 페이지 그룹
│   └── api/               # API 라우트 (현재는 사용되지 않음)
│
├── components/            # 재사용 가능한 React 컴포넌트
│   ├── auth/              # 인증 관련 컴포넌트
│   ├── layout/            # 헤더, 푸터 등 레이아웃 컴포넌트
│   ├── prompts/           # 상품 카드 컴포넌트
│   ├── seller/            # 판매자 대시보드 관련 컴포넌트
│   └── ui/                # ShadCN/UI 컴포넌트
│
├── hooks/                 # 커스텀 React Hooks (useToast 등)
│
├── lib/                   # 라이브러리, 상수, 타입, 유틸리티 함수
│   ├── constants.ts       # 카테고리, 상품 데이터 등 전역 상수
│   ├── firebase.ts        # Firebase 초기 설정
│   ├── string-constants.ts# UI 텍스트 문자열 상수
│   ├── types.ts           # 전역 타입 정의
│   └── utils.ts           # 유틸리티 함수 (cn, slugify 등)
│
└── public/                # 정적 파일 (이미지 등)
```

## 📝 다음 단계 및 개선 방향

-   **데이터베이스 연동**: 현재 상수 데이터(`constants.ts`)를 Firebase Firestore 또는 다른 데이터베이스로 이전하여 실제 데이터 관리.
-   **결제 시스템 통합**: Stripe 등의 결제 게이트웨이 연동.
-   **파일 업로드**: 상품 등록 시 이미지 및 콘텐츠 파일 업로드를 위한 Firebase Storage 연동.
-   **상세한 분석 기능**: 판매자를 위한 고급 분석 및 리포팅 기능 추가.
-   **테스트 코드 작성**: Jest, Playwright 등을 이용한 유닛/통합/E2E 테스트 추가.
