FROM node:16.20.0-alpine as base

WORKDIR /app
COPY package.json /app
RUN yarn install
RUN yarn prettier

FROM node:16.20.0-alpine as builder

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . /app/
RUN yarn build:staging
