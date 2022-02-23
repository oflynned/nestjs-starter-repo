FROM node:16.13-alpine as build

RUN apk add --virtual gyp curl bash python3 make g++ && rm -rf /var/cache/apk/*

WORKDIR /src

COPY . .

RUN npm ci --ignore-scripts
RUN npm run types

ENV NODE_ENV test

CMD ["npm", "run", "start:e2e"]
