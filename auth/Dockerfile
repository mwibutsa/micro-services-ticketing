FROM node:24.18.0-alpine

WORKDIR /app
RUN corepack enable
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./
RUN yarn set version 4.17.1
RUN yarn install
COPY . .

CMD [ "yarn", "start" ]