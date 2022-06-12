FROM node:12-alpine
ENV PAYMENT_SERVICE_PORT=5500 \
PRODUCT_SERVICE_PORT=4500 \
CART_SERVICE_PORT=3500 
RUN apk add --no-cache python2 g++ make
RUN mkdir -p /home/app
COPY . /home/app
EXPOSE 3500
CMD cd /home/app/cart && npm ci && cd /home/app/products && npm ci && cd /home/app/payments && npm ci && cd /home/app && npm i -g concurrently && concurrently "PRODUCT_SERVICE_PORT=4500  PAYMENT_SERVICE_PORT=5500 CART_SERVICE_PORT=3500 node ./payments/index.js" "PRODUCT_SERVICE_PORT=4500  PAYMENT_SERVICE_PORT=5500 CART_SERVICE_PORT=3500 node ./products/index.js"  "PRODUCT_SERVICE_PORT=4500  PAYMENT_SERVICE_PORT=5500 CART_SERVICE_PORT=3500 node ./cart/index.js"

