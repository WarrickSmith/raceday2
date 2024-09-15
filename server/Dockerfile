# Use the official Bun image as a parent image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app

# Set environment variables
ENV NZ_TAB_URL=https://json.tab.co.nz/schedule/
ENV MONGODB_URI=mongodb://10.1.1.95:27017/raceday2

# Copy package.json and bun.lockb (if you have one)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install --production

# Copy the rest of your app's source code
COPY . .

# Build the app
RUN bun run build

# Expose the port your app runs on
EXPOSE 5020

# Run the app
CMD ["bun", "run", "start"]
