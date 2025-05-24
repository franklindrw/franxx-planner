FROM node:23-alpine

RUN apk update && apk upgrade

RUN apk add --no-cache \
git \
bash

WORKDIR /app

COPY /api .

RUN npm install

CMD ["tail", "-f", "/dev/null"]