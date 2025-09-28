# prmart: AI 기반 디지털 자산 마켓플레이스 - 기술 백서 및 운영 가이드

이 문서는 prmart 프로젝트의 전체 아키텍처, 설정, 데이터 구조, 운영 노하우를 포함하는 기술 인수인계 문서입니다.

## 0. 핵심 전제 및 원칙 (반드시 반영)

*   **수익 배분**(공급가 기준): 플랫폼 15%(추천인 없을 때) 또는 플랫폼 10% + 추천인 5%(추천인 있을 때) / 판매자 나머지.
*   **PG 수수료**: **항상 플랫폼 몫에서 차감** (플랫폼 실수익 = 플랫폼 수수료 − PG수수료).
*   **VAT**: 표시가격은 **VAT 포함가**, 모든 내부 정산은 **공급가(= 표시가 / 1.1)** 기준.
*   **정산 홀드**: 기본 **T+14**일을 원칙으로 하며, 판매자 신용도에 따라 단축 가능.
*   **가입 정책**: 모든 가입자는 즉시 판매 및 구매 권한을 가지며, **리스크 기반 사전/사후 검수**로 안전을 보장합니다.
*   **회계 원칙**: 모든 금융 거래는 **원장(Transactions Ledger)**에 기록하여 회계 무결성을 보장합니다.

---

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

---

## 2. 데이터 모델 (Firestore 컬렉션)

> 설계 목적: **회계 불변식**(차·대변 합=0), **정산/환불/분쟁**을 코드로 재현 가능하게 하고, **추천 보상**의 확정/환수를 일관되게 처리합니다.

### 2.1 컬렉션 구조

*   **`products/{productId}`**: 판매 상품 정보
    *   `title, description, image, priceGross(표시가), category, sellerId, visibility, tags[], createdAt, updatedAt, stats{views,likes,sales}`

*   **`users/{uid}`**: 사용자 정보
    *   `displayName, email, role('user'|'seller'|'admin'), referralCode, referredBy, balances{available,pending,reserve}, kyc{…}`

*   **`orders/{orderId}`**: 주문 내역
    *   `buyerId, sellerId, productId, priceGross, priceNet(공급가), vat, referralCode?, pgFee, platformFee, referralFee, sellerEarning`
    *   `status`: `'created' | 'paid' | 'clearing_hold' | 'released' | 'refunded' | 'disputed' | 'chargeback'`
    *   `holdUntil(ISO), disputeId?, refundReason?`

*   **`transactions/{txId}`** (원장): 모든 금융 거래 기록
    *   `orderId, creditTo, debitFrom, amountNet, amountVat, currency, createdAt`
    *   `type`: `'platform_fee' | 'pg_fee' | 'seller_earn' | 'referral_earn' | 'vat' | 'gross_charge' | 'gross_refund' | 'reversal'`
    *   **규칙**: 한 주문에 대해 최소 4줄(구매자→플랫폼, 플랫폼→판매자, 플랫폼수익, PG수수료) 이상 기록되며, 합계는 항상 0이어야 합니다.

*   **`referrals/{code}`**: 추천인 코드 정보
    *   `ownerId, createdAt, disabled, policy{selfUse:false, minNet:5000, rate:0.05}`

*   **`payouts/{payoutId}`**: 정산 요청 내역
    *   `ownerId, target('seller'|'referrer'), amount, fee, method, status('requested'|'processing'|'paid'|'failed'), requestedAt, processedAt`

*   **`risk_events/{id}`**: 위험 이벤트 로그
    *   `orderId?, userId?, level('low'|'mid'|'high'), signal('firstOrder'|'highAmount'|'rapidRefund'|…), action('hold+7'|'hideProduct'|'ban'), createdAt`

---

## 3. 보안 규칙 (Firestore & Storage)

**목표:** 판매자는 자신의 상품만, 관리자는 모든 것을, 클라이언트는 민감한 데이터를 직접 수정할 수 없도록 제한합니다.

### 3.1 Firestore Rules (`firestore.rules`)
```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isSignedIn() { return request.auth != null; }
    function isAdmin() { return isSignedIn() && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin'; }
    function isSelf(uid) { return isSignedIn() && request.auth.uid == uid; }

    match /users/{uid} {
      allow read: if isSelf(uid) || isAdmin();
      allow write: if isSelf(uid) || isAdmin();
    }

    match /products/{productId} {
      allow read: if true;
      allow create: if isSignedIn();
      allow update, delete: if isSignedIn() && (request.resource.data.sellerId == request.auth.uid || isAdmin());
    }

    match /orders/{orderId} {
      allow read: if isSignedIn() && (resource.data.buyerId == request.auth.uid || resource.data.sellerId == request.auth.uid || isAdmin());
      allow create: if isSignedIn(); // 'draft' 상태로 생성만 허용
      allow update: if false; // 결제/정산 관련 모든 수치 변경은 Cloud Functions에서만 가능
    }

    match /transactions/{txId} {
      allow read: if isAdmin();
      allow write: if false; // Cloud Functions 전용
    }

    match /payouts/{payoutId} {
      allow read: if isSignedIn() && (resource.data.ownerId == request.auth.uid || isAdmin());
      allow create: if isSignedIn() && request.resource.data.ownerId == request.auth.uid;
      allow update: if isAdmin();
    }

    match /referrals/{code} {
      allow read: if true;
      allow write: if isAdmin();
    }

    match /risk_events/{id} {
      allow read: if isAdmin();
      allow write: if false; // Cloud Functions 전용
    }
  }
}
```

### 3.2 Storage Rules (`storage.rules`)
```
rules_version = '2';

service firebase.storage {
  match /b/{bucket}/o {
    // 프로필 이미지: 본인만 업로드 가능, 누구나 읽기 가능
    match /users/{userId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth.uid == userId;
    }
    // 상품 이미지: 판매자 본인만 업로드 가능, 누구나 읽기 가능
    // 경로에 sellerId를 포함하여 소유권 검증
    match /products/{sellerId}/{productId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == sellerId;
    }
  }
}
```

---

## 4. 라우트 맵 & 폴더 트리

```
src
├── ai/                    # Genkit AI 관련
│   ├── flows/             # - AI 핵심 로직 (Flows)
│   └── genkit.ts          # - Genkit 초기 설정
│
├── app/                   # Next.js App Router
│   ├── (auth)/            # - 인증 페이지 그룹 (로그인, 회원가입)
│   ├── account/           # - 사용자 계정 관리 페이지
│   ├── admin/             # - 관리자 대시보드
│   ├── browse/            # - 전체 상품 탐색 페이지
│   ├── c/[...slug]/       # - 카테고리별 상품 페이지
│   ├── p/[id]/            # - 상품 상세 페이지
│   ├── seller/            # - 판매자 센터
│   └── layout.tsx         # - 루트 레이아웃 (AuthProvider 포함)
│
├── components/            # 재사용 가능한 React 컴포넌트
│   ├── auth/              # - 인증 관련 컴포넌트
│   ├── layout/            # - 헤더, 푸터, 캐러셀 등
│   ├── prompts/           # - 상품 카드, 상세 정보 등
│   └── ui/                # - ShadCN/UI 컴포넌트
│
├── functions/ (예시)      # Firebase Cloud Functions (별도 배포)
│   ├── src/
│   │   ├── onPaymentCaptured.ts # - 결제 완료 핸들러
│   │   ├── scheduleReleaseHolds.ts # - 정산 보류 해제 스케줄러
│   │   └── lib/settlement.ts # - 수익 분배 로직
│   └── package.json
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

---

## 5. 판매/구매/요청 구성

### 5.1 판매하기 (`/seller`)
*   **상품 등록**: Zod 스키마로 검증된 폼 데이터를 서버 액션(`saveProductAction`)으로 처리.
*   **대시보드**: 가상 잔고(Available/Pending/Reserve), 정산 예정 캘린더, 총 매출/판매 건수, 베스트셀러, 환불/분쟁 내역 등 KPI 시각화.

### 5.2 아이디어 요청하기 (`/requests`)
*   **요청 생성**: 사용자가 필요한 디지털 자산에 대한 아이디어를 등록 (`createIdeaRequestAction`).
*   **제안 제출**: 다른 판매자들이 등록된 요청에 자신의 상품을 제안 (`createProposalAction`).

---

## 6. 추천인(Referral) 시스템 설계
*   **코드 발급**: 가입 시 고유 코드 자동 생성. 대시보드에서 링크/QR 코드로 공유 가능.
*   **보상 정책**:
    *   Self-referral(자기추천) 방지 로직 필수.
    *   보상은 거래의 정산 보류(T+14)가 해제된 후 `available` 잔고로 이동.
    *   환불/차지백 발생 시 지급된 보상은 자동으로 환수(원장 역분개).
    *   최소 출금액, 월 1회 정산 등 정책 적용.

---

## 7. 인증 및 세션 관리
*   **`AuthProvider`**: `onAuthStateChanged` 이벤트 발생 시 `getIdToken(true)`로 토큰을 강제 갱신하고, `firebaseIdToken` 쿠키를 설정합니다. 쿠키는 `Path=/`, `SameSite=Lax`, `Secure` (프로덕션 환경) 속성을 가집니다.
*   **`middleware.ts`**: `/admin`, `/seller`, `/account` 등 보호된 경로에 접근 시 쿠키 유효성을 검증. 실패 시 `login?continueUrl=…&error=session-expired`로 리디렉션하여 사용자에게 명확한 피드백을 제공합니다.
*   **트러블슈팅**: "재로그인 이슈"는 대부분 쿠키의 `Domain` 또는 `Path` 속성, `HttpOnly` 설정, 프록시 환경에서의 헤더 전달 문제로 발생하므로, 배포 환경에서 이 부분을 집중적으로 점검해야 합니다.

---

## 8. Firestore 인덱스 가이드
실서비스에서 원활한 쿼리를 위해 아래와 같은 복합 인덱스가 필요합니다. Firestore 콘솔에서 쿼리 실행 시 자동으로 생성 링크를 제공해줍니다.
*   `products`: `(categorySlug, createdAt desc)`
*   `orders`: `(sellerId, orderDate desc)`, `(buyerId, orderDate desc)`
*   `proposals`: `(requestId, createdAt desc)`
*   `ideaRequests`: `(createdAt desc)`

---

## 9. 테스트 및 모니터링
*   **E2E 테스트**: Playwright/Cypress를 사용하여 비로그인/일반/판매자/관리자 역할별 핵심 동선(가입→로그인→상품등록→구매→정산확인)을 자동화합니다.
*   **로깅**: 모든 로그 메시지에 `[MW]`, `[ACTION]`, `[FUNC]`, `[SERVICE]` 등 태그를 붙여 출처를 명확히 합니다.
*   **알림**: 정산 실패, 분쟁 발생률 급증, 환불율 임계치 초과 등 이상 징후 발생 시 Slack/이메일로 즉시 알림을 받도록 구성합니다.

---

## 10. 알려진 이슈/에러와 해결법

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
