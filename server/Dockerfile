# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
# Compiler le seed séparément
RUN npx tsx --tsconfig tsconfig.json src/seed/seed.ts --dry-run 2>/dev/null || true

# Stage 2: Run
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
# Copier les sources du seed compilées
COPY --from=build /app/src/seed ./src/seed
COPY --from=build /app/src ./src
RUN npm install -g tsx
RUN mkdir -p uploads
EXPOSE 5000
CMD ["node", "dist/index.js"]