# prmart: AI 기반 디지털 자산 마켓플레이스 - 기술 백서 및 운영 가이드

이 문서는 prmart 프로젝트의 전체 아키텍처, 설정, 데이터 구조, 운영 노하우를 포함하는 기술 인수인계 문서입니다.

## 1. 환경변수 (`.env` 예시)

프로젝트를 구동하기 위해 루트 디렉터리에 `.env` 파일을 생성하고 아래 내용을 채워야 합니다.

```env
# ===================================================================
# 1. Firebase 클라이언트 설정 (웹 브라우저에서 사용)
# - 사용 위치: src/lib/firebase/client.ts
# - 설명: 웹 애플리케이션이 Firebase 프로젝트와 통신하기 위한 공개 식별 정보입니다.
# - 획득 방법: Firebase Console > 프로젝트 설정 > 일반 > 내 앱 > SDK 설정 및 구성
# ===================================================================
NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSy...YOUR_API_KEY..."
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="prmart-xxxx.firebaseapp.com"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="prmart-xxxx"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="prmart-xxxx.appspot.com"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="1234567890"
NEXT_PUBLIC_FIREBASE_APP_ID="1:1234567890:web:abcdef123456"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="G-XXXXXXXXXX" # 선택 사항 (Google Analytics)

# ===================================================================
# 2. Firebase 관리자(Admin) 설정 (서버 환경에서만 사용)
# - 사용 위치: src/lib/firebaseAdmin.ts
# - 설명: 서버(API Route, Middleware)가 관리자 권한으로 Firebase 서비스(DB 접근, 사용자 제어 등)를 사용하기 위한 비밀 키입니다.
# - 획득 방법: Firebase Console > 프로젝트 설정 > 서비스 계정 > 새 비공개 키 생성
# - 중요: 생성된 JSON 파일의 내용을 작은따옴표('')로 감싸서 한 줄로 붙여넣어야 합니다.
# ===================================================================
FIREBASE_ADMIN_SDK_JSON='{"type": "service_account", "project_id": "...", ...}'

# ===================================================================
# 3. Genkit (Google AI Studio) 설정
# - 사용 위치: src/ai/genkit.ts (Google AI 플러그인 초기화 시)
# - 설명: AI 기능(상품 설명 생성, 콘텐츠 검수 등)을 위한 Gemini API 키입니다.
# ===================================================================
GEMINI_API_KEY="AIzaSy...YOUR_GEMINI_API_KEY..."
```

## 2. Firebase 콘솔 설정 요약

### Authentication (인증)
- **활성화된 제공자**:
  - `이메일/비밀번호`
  - `Google`
- **승인된 도메인**:
  - `localhost` (개발용)
  - 배포된 도메인 (예: `prmart.ai`, `*.prmart.ai`, `prmart.web.app`)
- **OAuth 리디렉션 URI**:
  - Firebase 콘솔의 Google 제공자 설정에서 자동으로 생성된 URI를 복사하여 Google Cloud Console의 OAuth 2.0 클라이언트 ID 설정에 추가해야 합니다.

### Firestore (데이터베이스)
- **사용 중인 컬렉션**:
  - `users`: 사용자 정보 (이메일, 역할, 프로필 등)
  - `products`: 판매 상품 정보
  - `categories`: 상품 카테고리
  - `ideaRequests`: 아이디어 요청
  - `proposals`: 아이디어 제안
  - `orders`: 주문 내역 (향후 구현)
  - `reviews`: 리뷰 (향후 구현)
- **필요한 색인(Index)**:
  - 현재는 기본 색인만 사용 중입니다. 복합 쿼리(예: `where` + `orderBy`)가 추가될 경우, Firestore가 제공하는 색인 생성 링크를 통해 추가해야 합니다.

### Storage (스토리지)
- **사용 버킷**: `prmart-xxxx.appspot.com` (기본 버킷)
- **주요 용도**: 사용자가 업로드하는 상품 이미지, 프로필 사진 등을 저장합니다. (현재는 이미지 URL을 직접 사용)
- **규칙**: 아래 '3. 보안 규칙' 항목 참조.

### 기타
- **Hosting**: 사용 안 함 (Firebase App Hosting 또는 다른 플랫폼 사용)
- **Functions**: 사용 안 함 (Genkit Flow 또는 API Route로 대체)

## 3. 보안 규칙

### Firestore Rules (`firestore.rules`)
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    // 사용자 정보: 본인만 쓰기 가능, 로그인한 사용자는 읽기 가능
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }

    // 상품: 누구나 읽기 가능, 쓰기는 소유자 또는 관리자만 가능
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && (request.auth.uid == resource.data.sellerId || get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
    
    // 카테고리: 누구나 읽기 가능, 쓰기는 관리자만 가능
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // 아이디어 요청 및 제안: 누구나 읽기 가능, 쓰기는 로그인 사용자만 가능
    match /ideaRequests/{requestId} {
        allow read: if true;
        allow write: if request.auth != null;
    }
    match /proposals/{proposalId} {
        allow read: if true;
        allow write: if request.auth != null;
    }
  }
}
```

### Storage Rules (`storage.rules`)
```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // 프로필 이미지: 본인만 업로드 가능, 누구나 읽기 가능
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
    // 상품 이미지: 인증된 사용자(판매자)만 업로드 가능, 누구나 읽기 가능
    match /products/{productId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // TODO: 판매자 역할 확인 규칙 추가
    }
  }
}
```

## 4. 라우트 맵 & 폴더 트리

```
src
├── ai/                    # Genkit AI 관련
│   ├── flows/             # - AI 핵심 로직 (Flows)
│   └── genkit.ts          # - Genkit 초기 설정
│
├── app/                   # Next.js App Router
│   ├── (auth)/            # - 인증 페이지 그룹 (로그인, 회원가입)
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── admin/             # - 관리자 전용 페이지 그룹
│   │   ├── layout.tsx
│   │   ├── users/page.tsx
│   │   └── page.tsx
│   ├── api/               # - API 라우트
│   │   └── admin/         #   - 관리자용 API
│   ├── browse/            # - 전체 상품 탐색 페이지
│   ├── c/[...slug]/       # - 카테고리별 상품 페이지
│   ├── p/[id]/            # - 상품 상세 페이지
│   ├── requests/          # - 아이디어 요청 관련 페이지
│   └── layout.tsx         # - 루트 레이아웃 (AuthProvider 포함)
│
├── components/            # 재사용 가능한 React 컴포넌트
│   ├── auth/              # - 인증 관련 컴포넌트 (로그인/가입 폼, 버튼)
│   ├── layout/            # - 헤더, 푸터, 캐러셀 등
│   ├── prompts/           # - 상품 카드, 상세 정보 등
│   ├── requests/          # - 아이디어 요청 폼, 카드 등
│   └── ui/                # - ShadCN/UI 컴포넌트
│
├── lib/                   # 라이브러리, 헬퍼, 타입 정의
│   ├── firebase/          # - Firebase 관련 설정
│   │   ├── auth.ts        #   - 인증 관련 클라이언트 함수
│   │   ├── client.ts      #   - Firebase 클라이언트 앱 초기화
│   │   └── services.ts    #   - Firestore DB 서비스 함수
│   ├── firebaseAdmin.ts   # - Firebase Admin SDK 초기화 (서버용)
│   ├── types.ts           # - 전역 타입스크립트 타입
│   └── ...
│
└── middleware.ts          # Edge 미들웨어 (경로 보호 로직)
```

## 5. 의존성 및 빌드/배포 파이프라인

- **주요 의존성 (`package.json`)**:
  - `next`: 프레임워크
  - `react`, `react-dom`: UI 라이브러리
  - `firebase`, `firebase-admin`: Firebase 클라이언트/서버 SDK
  - `genkit`, `@genkit-ai/googleai`: AI 기능
  - `tailwindcss`, `shadcn-ui`: 스타일링 및 UI 컴포넌트
  - `lucide-react`: 아이콘
  - `zod`: 스키마 검증
  - `recharts`: 차트 (대시보드용)
- **빌드 명령어**: `npm run build`
- **개발 서버 실행**:
  1. `npm run dev` (웹 애플리케이션, `localhost:9002`)
  2. `npm run genkit:dev` (AI 기능, `localhost:3100`, 별도 터미널)
- **배포**: Firebase App Hosting을 사용하며, `apphosting.yaml` 파일에 따라 설정됩니다. GitHub 레포지토리와 연결하여 푸시 시 자동 빌드 및 배포가 이루어집니다.

## 6. 초기 데이터 스키마

### `users`
- **설명**: 사용자 정보 저장
- **필드**:
  - `email` (string): 이메일
  - `displayName` (string): 닉네임
  - `photoURL` (string, optional): 프로필 사진 URL
  - `role` (string): 사용자 권한 (`user` | `admin` | `seller`)
  - `createdAt` (string, ISO): 가입일
  - `referralCode` (string, optional): 이 사용자의 고유 추천인 코드
  - `referredBy` (string, optional): 이 사용자를 추천한 사람의 추천인 코드

### `products`
- **설명**: 판매 상품 정보
- **필드**: `src/lib/types.ts`의 `Prompt` 타입 참조.

### `ideaRequests`
- **설명**: 사용자의 아이디어 요청
- **필드**: `src/lib/types.ts`의 `IdeaRequest` 타입 참조.

### `proposals`
- **설명**: 아이디어 요청에 대한 판매자의 제안
- **필드**: `src/lib/types.ts`의 `Proposal` 타입 참조.

## 7. 알려진 이슈/에러와 해결법

### **Issue 1: `auth/api-key-not-valid` 또는 `[CLIENT_INIT_FAIL]`**
- **증상**: 로그인 시 "Firebase: Error (auth/api-key-not-valid...)" 또는 "인증 서비스를 사용할 수 없습니다. [CLIENT_INIT_FAIL]" 오류 발생.
- **원인**: **99% 확률로 `.env` 파일의 클라이언트 환경 변수(`NEXT_PUBLIC_FIREBASE_*`) 누락 또는 오타.** Next.js 앱이 어떤 Firebase 프로젝트에 연결해야 할지 모르는 상태.
- **해결법**:
  1. 이 문서의 **1번 항목**을 참조하여, 프로젝트 루트에 `.env` 파일을 생성합니다.
  2. Firebase 콘솔에서 **웹 앱의 `firebaseConfig` 객체**를 찾아, `NEXT_PUBLIC_`으로 시작하는 6개의 키 값을 **정확히 복사하여 붙여넣습니다.**
  3. Next.js 개발 서버를 완전히 종료(`Ctrl+C`)했다가 `npm run dev`로 다시 시작합니다.

### **Issue 2: `[ADMIN_INIT_ERROR]` 또는 미들웨어/API에서 500 오류**
- **증상**: 관리자 페이지 접근 시 500 오류가 발생하거나, 서버 로그에 "Firebase Admin SDK not configured" 또는 "Failed to parse" 오류가 기록됨.
- **원인**: 서버용 Admin SDK 초기화 실패. `FIREBASE_ADMIN_SDK_JSON` 환경 변수가 없거나, 값이 유효한 JSON 형식이 아님.
- **해결법**:
  1. 이 문서의 **1번 항목**을 참조하여, Firebase 콘솔에서 **서비스 계정의 비공개 키(JSON 파일)를 생성**합니다.
  2. 다운로드한 JSON 파일의 **모든 내용을 복사**합니다.
  3. `.env` 파일의 `FIREBASE_ADMIN_SDK_JSON=` 뒷부분에 **작은따옴표(`'`)로 감싸서 한 줄로** 그대로 붙여넣습니다. (여러 줄로 나뉘면 안 됨)
  4. 개발 서버를 재시작합니다.

### **Issue 3: `Module not found: Can't resolve 'child_process'`**
- **증상**: `npm run build` 시 빌드 실패.
- **원인**: **클라이언트 컴포넌트(`"use client"`)가 서버 전용 모듈(`firebase-admin` 등)을 직접 또는 간접적으로 `import`함.** Next.js App Router의 엄격한 서버/클라이언트 경계를 위반한 경우입니다.
- **해결법**:
  1. 클라이언트 컴포넌트에서는 `src/lib/firebase/client.ts` 또는 `auth.ts` 와 같이 순수 클라이언트용으로 만들어진 파일만 `import` 해야 합니다.
  2. 서버 로직(DB 쓰기, 사용자 권한 변경 등)이 필요할 경우, 클라이언트에서 직접 함수를 호출하는 대신 **서버 액션(Server Action)을 정의**하고 폼(form)을 통해 호출합니다.
  3. `src/lib/services.ts` 와 같은 공용 서비스 파일에는 서버 전용 코드가 포함되지 않도록 주의해야 합니다. 필요시 파일을 `services.client.ts`, `services.server.ts`로 분리하는 전략도 유효합니다.
