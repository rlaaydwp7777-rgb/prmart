# 문제 해결 가이드

## 빌드 에러

### Module not found
→ 파일 경로 확인
→ `npm install` 재실행

### TypeScript 에러
→ `tsconfig.json` 확인
→ `@/*` alias 설정 확인

### Firebase 초기화 실패
→ 환경 변수 확인
→ `.env.local` 파일 존재 확인

## 배포 에러

### Vercel 빌드 실패
→ 로컬에서 `npm run build` 먼저 테스트
→ 환경 변수 Vercel에 설정 확인

### 404 에러
→ `src/app/page.tsx` 존재 확인
→ Framework Preset: Next.js 확인

## 권한 에러

### 관리자 페이지 접근 불가
→ Custom Claims 설정 확인
→ 로그아웃 후 재로그인
