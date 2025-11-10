FROM node:19.5.0-alpine AS builder

RUN apk add --no-cache npm

COPY . /mmi-game
WORKDIR /mmi-game

RUN npm install
RUN npm run build

#/mmi-game/build

#use an Apache image and copy the static build into its document root
FROM httpd:alpine

# httpd serves files from /usr/local/apache2/htdocs by default; overwrite it with our build output
COPY --from=builder /mmi-game/build/ /usr/local/apache2/htdocs/

COPY ./httpd.conf /usr/local/apache2/conf/httpd.conf

EXPOSE 80

CMD ["httpd-foreground"]