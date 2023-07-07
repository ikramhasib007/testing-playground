# syntax=docker/dockerfile:1

FROM node:18-alpine
# ENV NODE_ENV=production

WORKDIR /app

RUN npm install -g npm@latest
RUN npm install -g pnpm
RUN pnpm config set store-dir ~/.pnpm-store

COPY ["package.json", "pnpm-lock.yaml*", "./"]

RUN pnpm install

COPY . .

CMD ["pnpm", "start"]