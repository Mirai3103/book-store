# build stage
FROM node:18-alpine3.16 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install 
COPY . .
RUN npm run build

# production stage
FROM nginx:latest as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
