# 1) deps
FROM node:20 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# 2) build
FROM node:20 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Next.js: 프로덕션 빌드
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# 3) run
FROM node:20
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
# Next.js standalone(선호)면 .next/standalone + .next/static만 복사
# 일반 빌드라면 전체 복사
COPY --from=builder /app ./
EXPOSE 8080
# Next.js는 start가 포트를 받도록 설정
CMD ["npm","run","start"]
