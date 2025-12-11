# Etapa 1: Builder
FROM node:14.15.1-alpine as builder
WORKDIR /app
COPY package*.json ./
# Instalamos dependencias (usamos --legacy-peer-deps si hay conflictos viejos)
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Etapa 2: Runner (Nginx)
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Copiamos nuestra config de nginx personalizada
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]