FROM node:14
WORKDIR /usr/src/enkete-api
COPY ./package.json .
RUN npm install --only=prod

