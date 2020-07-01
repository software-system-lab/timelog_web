FROM nginx:1.14

ADD build/ /var/www
ADD nginx.conf /etc/nginx/nginx.conf
