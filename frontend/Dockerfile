# Use an official Node.js image as the base image
FROM node:20-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Expose port 3000 to the outside world
EXPOSE 5173

# Start the React application
CMD ["npm","run", "dev"]
