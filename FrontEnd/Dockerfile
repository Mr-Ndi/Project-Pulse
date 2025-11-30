# Step 1: Use an official Node.js runtime as a parent image
FROM node:20-alpine AS build

# Step 2: Install pnpm globally
RUN npm install -g pnpm

# Step 3: Set the working directory inside the container
WORKDIR /app

# Step 4: Copy package.json and pnpm-lock.yaml to install dependencies
COPY package.json pnpm-lock.yaml ./

# Step 5: Install all dependencies using pnpm
RUN pnpm install

# Step 6: Copy the rest of the application code into the container
COPY . .

# Step 7: Build the React app
RUN pnpm run build

# Step 8: Use an official Nginx image to serve the React app
FROM nginx:alpine

# Step 9: Copy the Vite `dist` folder from the build image to the Nginx web server
# Vite outputs to `dist` by default (not `build`).
COPY --from=build /app/dist /usr/share/nginx/html

# Step 10: Expose port 80 to access the app
EXPOSE 80

# Step 11: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
