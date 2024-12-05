# 1. Use Node.js 18 Alpine as base image
FROM node:18-alpine AS base

WORKDIR /app

# Install dependencies only when needed
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./

RUN \
	if [ -f yarn.lock ]; then yarn install --frozen-lockfile; \
	elif [ -f package-lock.json ]; then npm ci; \
	elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm install; \
	else echo "Lockfile not found." && exit 1; \
	fi

# 2. Build the app
FROM base AS builder

WORKDIR /app
COPY . .

# Build the Next.js app
RUN npm run build

# 3. Final stage - Production image
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy the build output and dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next   
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Switch to the non-root user
USER nextjs

# Expose the necessary port
EXPOSE 3000

# Define environment variables
ENV PORT=3000

# Start the application
CMD ["npm", "start"]
