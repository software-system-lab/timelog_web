FROM nginx:1.14

WORKDIR /app

ADD public .
ADD nginx.conf /etc/nginx/nginx.conf
