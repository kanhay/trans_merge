# Use the official Node.js image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
# COPY . .
RUN npm i

# Expose the port the application runs on
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]