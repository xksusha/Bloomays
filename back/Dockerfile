FROM node:14-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN yarn

COPY . .

RUN yarn build

FROM node:14-alpine

WORKDIR /app

COPY package*.json ./

RUN yarn --only=production

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["yarn", "start:prod"]
