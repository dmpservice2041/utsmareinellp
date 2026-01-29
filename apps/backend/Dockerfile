# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json files
COPY package*.json ./
COPY apps/backend/package*.json ./apps/backend/

# Install dependencies (including devDependencies for tsc)
# Since we are in monorepo structure, we might need to be careful.
# Simplest approach for monorepo without workspaces setup in docker:
# Copy everything relevant.
COPY . .

# Install dependencies
RUN npm install

# Build backend
WORKDIR /app/apps/backend
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy package.json files
COPY apps/backend/package*.json ./

# Install ONLY production dependencies
RUN npm install --production

# Copy built assets from builder
COPY --from=builder /app/apps/backend/dist ./dist
# Copy env file if needed (usually injected by docker-compose)

EXPOSE 8002

CMD ["node", "dist/index.js"]
