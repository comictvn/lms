FROM composer:2.5 as build
COPY . /app/
RUN composer install --prefer-dist --optimize-autoloader --no-interaction

FROM alpine:latest as laravel

ENV APP_ENV="production"
ENV APP_DEBUG=false
ARG LARAVEL_ENV_ENCRYPTION_KEY_ARG
ENV LARAVEL_ENV_ENCRYPTION_KEY=$LARAVEL_ENV_ENCRYPTION_KEY_ARG

# Install packages and remove default server definition
RUN apk add --no-cache \
  bash \
  php82  \
  php82-bcmath  \
  php82-ctype  \
  php82-fileinfo \
  php82-json  \
  php82-mbstring  \
  php82-openssl  \
  php82-pdo_pgsql  \
  php82-pdo_mysql \
  php82-curl  \
  php82-pdo  \
  php82-tokenizer  \
  php82-xml \
  php82-phar \
  php82-dom \
  php82-gd \
  php82-iconv \
  php82-xmlwriter \
  php82-xmlreader \
  php82-zip \
  php82-simplexml \
  php82-session \
  php82-opcache \
  php82-gd \
  php82-intl \
  php82-pcntl \
  php82-posix \
  php82-redis \
  curl \
  nginx \
  runit

# Create symlink so programs depending on `php` still function
RUN cp /usr/bin/php82 /usr/bin/php

# Install php-imagick
RUN apk add php82-pecl-imagick --repository=https://dl-cdn.alpinelinux.org/alpine/edge/community

# Add PHP.ini Config
COPY php/php.ini /etc/php82/conf.d/custom.ini

# Remove Cache
RUN rm  -rf /tmp/* /var/cache/apk/*

# Install Composer
COPY --from=build /usr/bin/composer /usr/bin/composer

# Moving Source
COPY --from=build /app /var/www/html

# Setup document root
WORKDIR /var/www/html

RUN php artisan env:decrypt --env="production" 
RUN php artisan storage:link

# Expose port
EXPOSE 3000
