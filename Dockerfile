FROM nginx:latest
EXPOSE 3080

COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

COPY .dist/ /usr/share/nginx/html

CMD ["nginx"]