# Use an official Node.js base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and install deps
COPY package*.json ./
RUN npm install

# Copy rest of the code
COPY . .

# Expose the port your app runs on (e.g. 3000)
EXPOSE 3000

# Start the server
CMD ["npm", "run", "start"]
