# Use official Node.js LTS image
FROM node:18-slim

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (needed for build)
RUN npm ci

# Copy application source
COPY . .

# Build the Astro site
RUN npm run build

# Expose port (Cloud Run will set PORT env variable)
EXPOSE 8080

# Set HOST environment variable to 0.0.0.0 for Cloud Run
ENV HOST=0.0.0.0

# Run the built application
CMD ["npm", "start"]
