FROM nginx:1.14

ADD ./public/ /var/www/
ADD nginx.conf /etc/nginx/nginx.conf
