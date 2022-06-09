FROM node:16.13.0

WORKDIR /usr/src/

COPY ./ /usr/src

RUN npm install

EXPOSE 3030

RUN node ace serve start
