FROM nginx:1.17.1-alpine
#COPY custom-config.conf /etc/nginx/conf.d/default.conf
COPY dist/kb-md-web /usr/share/nginx/html/
EXPOSE 80

#