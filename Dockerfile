# Build stage
FROM node:16 as builder
ARG ENV=production
WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build

# Stage 1: serve by nginx
FROM nginx:stable-alpine
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]
