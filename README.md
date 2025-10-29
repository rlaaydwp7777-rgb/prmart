# PRMart - AI 프롬프트 마켓플레이스

## 🚀 빠른 시작

### 1. 환경 변수 설정
`.env.local` 파일 생성:
```bash
# Firebase 클라이언트
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=prmart-ai-assistant.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=prmart-ai-assistant
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=prmart-ai-assistant.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Firebase Admin (서버)
FIREBASE_ADMIN_PROJECT_ID=prmart-ai-assistant
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----"
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-...@prmart-ai-assistant.iam.gserviceaccount.com
```

### 2. 설치 및 실행
```bash
npm install
npm run dev
```

### 3. 빌드 테스트
```bash
npm run build
npm start
```

## 📁 주요 페이지

- `/` - 메인 페이지
- `/login` - 로그인
- `/admin` - 관리자 대시보드 (관리자만)
- `/admin/products` - 상품 승인
- `/admin/users` - 사용자 관리
- `/admin/orders` - 거래 내역

## 🔐 관리자 권한 설정

Firebase Console에서:
1. Authentication → Users
2. 사용자 선택 → Custom Claims 편집
3. `{"role": "admin"}` 추가

## ⚠️ 알려진 이슈

없음 (모든 빌드 에러 제거됨)

## 🛠️ 트러블슈팅

문제 발생 시 `TROUBLESHOOTING.md` 참조
