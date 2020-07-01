FROM nginx

RUN mkdir -p /var/www/html
COPY ./public/* /var/www/html
COPY nginx.conf /etc/nginx/conf.d/timelog_web.conf
