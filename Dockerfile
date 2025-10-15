# 1. 의존성 설치 단계 (deps)
FROM node:20 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2. 프로덕션 빌드 단계 (builder)
FROM node:20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js 원격 분석 비활성화
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# 3. 최종 실행 단계 (runner)
FROM node:20
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080

# Next.js standalone 모드 최적화
# next.config.js에서 output: 'standalone' 설정 시 활성화
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/.next/standalone ./
# COPY --from=builder /app/.next/static ./.next/static

# 일반 빌드 모드
COPY --from=builder /app ./

EXPOSE 8080

# package.json의 "start" 스크립트 실행
CMD ["npm", "run", "start"]
