# 1. 의존성 설치 단계 (deps)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
# 프로덕션 의존성만 설치하여 이미지 크기 최적화
RUN npm ci --omit=dev

# 2. 빌드 단계 (builder)
FROM node:20-alpine AS builder
WORKDIR /app
# deps 단계에서 설치된 node_modules 복사
COPY --from=deps /app/node_modules ./node_modules
# 소스 코드 복사
COPY . .
# Next.js 원격 측정 비활성화
ENV NEXT_TELEMETRY_DISABLED 1
# 프로덕션 빌드 실행
RUN npm run build

# 3. 최종 실행 단계 (runner)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1
# HTTPS를 위한 PORT 환경변수 설정 (App Hosting 표준)
ENV PORT 8080

# standalone 모드에서 생성된 파일들만 복사하여 이미지 크기 최소화
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# 비-루트 사용자로 실행하여 보안 강화
USER nextjs

EXPOSE 8080

# 최종 실행 명령
CMD ["node", "server.js"]
