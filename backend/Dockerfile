# Production Docker image for CollegeHub backend.
# This image is intentionally minimal and optimized for startup speed.

FROM node:20-alpine AS base

WORKDIR /app

# Install dependencies first for better Docker layer caching.
COPY package*.json ./
RUN npm ci --omit=dev

# Copy application source.
COPY . .

ENV NODE_ENV=production
EXPOSE 5000

# Start API server.
CMD ["node", "server.js"]

