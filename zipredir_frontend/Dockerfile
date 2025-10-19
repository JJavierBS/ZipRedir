# ZipRedir_frontend/Dockerfile
FROM node:20-alpine
WORKDIR /app

#Dependencias
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]