FROM node:lts-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 8080

CMD [ "npm", "run", "serve" ]