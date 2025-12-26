FROM node:24-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    graphviz \
    fonts-noto-cjk \
    && rm -rf /var/lib/apt/lists/*

# Enable Corepack to use pnpm
RUN corepack enable

WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Build the project
RUN npm run build
