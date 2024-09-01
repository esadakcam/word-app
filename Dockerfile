# Stage 1: Build the application
FROM node:20-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run the application
FROM node:20-alpine

# Set the working directory
WORKDIR /app/backend

# Copy the built application from the previous stage
COPY --from=build /app/dist ./public

# Install only production dependencies
RUN npm install 

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]