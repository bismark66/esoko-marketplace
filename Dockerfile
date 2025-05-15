 
FROM node:20-alpine
ENV VITE_API_BASE_URL=http://digimakt-api.esoko.com:7030/v1
WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "serve", "-s", "dist" ]
