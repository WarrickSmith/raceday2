# Use the official Bun image as a parent image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Set environment variables
ENV  NEXT_PUBLIC_API_URL=http://localhost:5020

# Copy package.json and bun.lockb (if you have one)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --production

# Copy the rest of your app's source code
COPY . .

# Build the app
RUN bun run build

# Expose the port your app runs on
EXPOSE 3003

# Run the app
CMD ["bun", "start"]