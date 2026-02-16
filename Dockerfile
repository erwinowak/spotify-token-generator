# Use Bun as base image
FROM oven/bun:1 AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app

# Copy package files
COPY package.json bun.lock* ./
# Install dependencies
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Set environment variables for build
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Clean any existing build artifacts
RUN rm -rf .next

# Build the application
RUN bun run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Copy necessary files from builder
# Standalone output includes server.js and all necessary dependencies
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Ensure proper permissions
RUN chmod -R 755 /app

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application using Bun
# Next.js standalone creates server.js which can be run with Bun
# Using node instead of bun run to avoid potential issues with server actions
CMD ["node", "server.js"]
