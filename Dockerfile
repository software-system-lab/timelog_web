FROM nginx:1.14

ADD ./public /var/www/html
ADD nginx.conf /etc/nginx/nginx.conf
