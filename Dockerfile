# 构建阶段
FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# 生产阶段
FROM node:22-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

# 创建非 root 用户
RUN addgroup -S appgroup && \
    adduser -S -G appgroup -s /bin/sh appuser

COPY --from=builder /usr/src/app/dist ./dist
COPY package*.json ./
RUN npm install --only=production && \
    chown -R appuser:appgroup /usr/src/app

USER appuser

EXPOSE 3000
CMD ["node", "dist/index.js"]# ... 其他指令 ...
