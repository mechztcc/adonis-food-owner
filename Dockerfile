FROM node:16.13.0

WORKDIR /app
COPY ./ /app/

RUN npm install

CMD [ "node", "ace", "serve" ]
EXPOSE 3030