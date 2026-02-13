FROM node:20-alpine AS base

WORKDIR /app

# Next.js 빌드 및 런타임에 필요한 패키지 설치
RUN apk add --no-cache libc6-compat

ENV NODE_ENV=development

# 의존성 설치
COPY package*.json ./
RUN npm install

# 애플리케이션 소스 복사
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]

