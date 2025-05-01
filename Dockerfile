FROM node:16

ADD . /usr/src/app
WORKDIR /usr/src/app
RUN rm -rf build

RUN npm install

# ENV API_RELEASE_STAGE="staging"
# ENV RMQ_USER='admin'
ENV APP_PORT=80


EXPOSE ${APP_PORT}

CMD ["npm","run","dev"]
  
