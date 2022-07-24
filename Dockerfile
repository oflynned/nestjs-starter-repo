FROM node:18.6-alpine as build

RUN apk add --virtual gyp curl bash python3 make g++ && rm -rf /var/cache/apk/*
RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /src

COPY . .

RUN rm -rf ./src/e2e

RUN npm ci --ignore-scripts
RUN npm run types
RUN npm run build
RUN npm run assets:copy

RUN npm prune --production
RUN /usr/local/bin/node-prune

FROM node:18.6-alpine

WORKDIR /dist

COPY --from=build /src/dist/ ./dist
COPY --from=build /src/node_modules ./node_modules

ENV NODE_ENV production

CMD ["node", "dist/main.js"]