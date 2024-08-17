# Stage 1: Build the application
FROM node:18-alpine3.19 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json or yarn.lock
COPY package*.json ./
# or if you're using yarn
# COPY yarn.lock ./

# Copy the prisma directory
COPY prisma ./prisma

# Install dependencies
RUN npm install
# or if you're using yarn
# RUN yarn install

# Generate Prisma client
RUN npx prisma generate
# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build
# or if you're using yarn
# RUN yarn build

# Stage 2: Serve the application
FROM node:18-alpine3.19 AS runner

# Set working directory
WORKDIR /app

# Install `serve` to serve the built application
RUN npm install -g serve

# Copy the built application from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
# or if you're using yarn
# COPY --from=builder /app/yarn.lock ./

# Install only production dependencies
RUN npm install --production
# or if you're using yarn
# RUN yarn install --production

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "run", "start"]