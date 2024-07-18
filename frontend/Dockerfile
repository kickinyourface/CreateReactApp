# Usa una imagen base de Node.js
FROM node:14

# Actualiza npm a una versión específica compatible con Node.js 14
RUN npm install -g npm@6

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Configura npm para manejar tiempos de espera largos
RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

# Instala todas las dependencias
RUN npm install

# Copia todo el código de la aplicación al contenedor
COPY . .

# Construye la aplicación para producción
RUN npm run build

# Instala un servidor web simple para servir el contenido estático
RUN npm install -g serve

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# Comando para correr la aplicación
CMD ["serve", "-s", "build"]
