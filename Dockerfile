# Stage 1: Build
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package.json package-lock.json ./
RUN npm install
COPY . . 
ENV VITE_API_BASE_URL=http://digimakt-api.esoko.com:7030

RUN npm run build

# Stage 2: Run
FROM nginx:alpine AS runtime

COPY --from=build /usr/src/app/dist /usr/share/nginx/html
ENV APP_PORT=5173

EXPOSE ${APP_PORT}
CMD ["nginx", "-g", "daemon off;"]
  
