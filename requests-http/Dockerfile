## Create env from source copy values and run build
FROM node:lts-alpine as angular
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . .
RUN npm run build

## sending to serve NGINX

FROM nginx
VOLUME /var/cache/nginx
COPY --from=angular app/dist/requests-http /usr/share/nginx/html
COPY ./config/nginx.conf /etc/nginx/conf.d/default.conf

##
## docker build -t curso-angular .

# docker run -p 8055:80 curso-angular
