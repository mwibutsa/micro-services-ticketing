FROM node:24.18.0-alpine

WORKDIR /app
RUN corepack enable
COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY package.json ./
COPY yarn.lock ./
# RUN yarn set version 4.18.0
RUN yarn workspaces focus --production
COPY . .

CMD [ "yarn", "start" ]
