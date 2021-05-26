FROM node:alpine as builder

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --pure-lockfile

COPY ./ ./


RUN npm run build

FROM nginx
EXPOSE 3000

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/src/app/build /usr/share/nginx/html