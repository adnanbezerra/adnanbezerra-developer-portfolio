# ---------- Base ----------
FROM node:20-alpine AS base
ARG PNPM_VERSION=10.33.3
RUN corepack enable pnpm && corepack prepare pnpm@${PNPM_VERSION} --activate

# ---------- Dependencies ----------
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# Dependências de sistema necessárias para build nativo
RUN apk add --no-cache build-base

RUN pnpm install --frozen-lockfile

# ---------- Build ----------
FROM base AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN pnpm build

# ---------- Runner ----------
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production

# Criar usuário não-root
RUN addgroup -S nodejs -g 1001
RUN adduser -S nodejs -u 1001 -G nodejs

# Copiar apenas arquivos necessários
COPY --from=builder /app/dist ./dist
COPY package.json pnpm-lock.yaml ./

# Instalar somente dependências de produção
RUN pnpm install --prod --frozen-lockfile

USER nodejs

EXPOSE 3000

CMD ["node", "dist/index.cjs"]
