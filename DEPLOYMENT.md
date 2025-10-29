# 배포 가이드

## Vercel 배포

### 1. GitHub 푸시
```bash
git add .
git commit -m "Deploy v2"
git push origin main
```

### 2. Vercel 환경 변수
Dashboard → Settings → Environment Variables

필수 변수:
- `NEXT_PUBLIC_FIREBASE_*` (6개)
- `FIREBASE_ADMIN_*` (3개)

### 3. 배포 확인
- Build Logs 확인
- 에러 없으면 3분 후 완료

## Firebase App Hosting 배포

### 1. apphosting.yaml 확인
```yaml
runConfig:
  cpu: 1
  memoryMiB: 512
  concurrency: 80
  maxInstances: 10
labels: {}
```

### 2. 푸시 후 자동 배포
Firebase App Hosting 백엔드를 GitHub 저장소에 연결하면 `main` 브랜치로 푸시할 때마다 자동으로 배포가 트리거됩니다.
