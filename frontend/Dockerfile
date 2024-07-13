# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instala las dependencias
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
