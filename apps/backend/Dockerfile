# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Expose backend port (matches .env)
EXPOSE 4000

# Start NestJS in development mode
CMD ["npm", "run", "start:dev"]
