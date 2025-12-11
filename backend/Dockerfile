# Uso la versión exacta definida en tu package.json
FROM node:14.15.1

WORKDIR /app

# Copiamos primero los package.json para aprovechar la caché de capas de Docker
COPY package*.json ./

# Instalamos dependencias
RUN npm install

# Copiamos el resto del código
COPY . .

# Exponemos el puerto 5000 que usas en index.js
EXPOSE 5000

CMD ["node", "index.js"]
