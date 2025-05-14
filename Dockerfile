FROM node:18

ADD . /usr/src/app
WORKDIR /usr/src/app

COPY . .
# Install dependencies
RUN npm install

# Copy environment variables
COPY  .env.example .env
ENV VITE_API_BASE_URL=http://digimakt-api.esoko.com:7030
ENV APP_PORT=5173

EXPOSE ${APP_PORT}

CMD ["npm","run","dev"]
  
