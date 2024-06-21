# Dockerfile

# Usar imagen base de Node.js
FROM node:16

# Establecer directorio de trabajo
WORKDIR /usr/src/app

# Copiar archivos de la aplicación
COPY package*.json ./
COPY dist/ ./dist/

# Instalar dependencias
RUN npm install --production

# Exponer puerto
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "./dist/server.js"]
