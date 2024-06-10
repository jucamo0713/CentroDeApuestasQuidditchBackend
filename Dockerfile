FROM node:20.12.2 as builder

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20.12.2-alpine as runner

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --prod --frozen-lockfile && yarn cache clean

COPY --from=builder app/dist/ ./dist/

CMD ["yarn", "start:prod"]