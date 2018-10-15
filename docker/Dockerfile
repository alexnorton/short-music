FROM node:8-alpine AS builder

WORKDIR /app

ADD package.json yarn.lock /app/
RUN yarn

ADD . /app/
RUN yarn run build

FROM nginx:stable-alpine

COPY --from=builder /app/build /etc/nginx/html

RUN ln -sf /dev/stdout /var/log/nginx/access.log && ln -sf /dev/stderr /var/log/nginx/error.log
RUN rm /etc/nginx/conf.d/*

COPY docker/nginx.conf /etc/nginx/nginx.conf
