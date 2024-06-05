# Use a slim Node.js image without Alpine
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy remaining project files
COPY . .

# Expose port (adjust if needed)
EXPOSE 5173

# Start the development server
CMD [ "npm", "run", "dev" ]