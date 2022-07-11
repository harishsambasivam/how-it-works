FROM node:14

ENV PORT=3000 \
    DB_USERNAME=postgres \
    DB_HOST=postgres-lambda-poc.c5fgtmn5vpon.ap-south-1.rds.amazonaws.com \
    DB_PASSWORD=postgres \
    DB_NAME=popstore \
    DB_PORT=5432 

RUN mkdir -p /home/app

COPY . /home/app

EXPOSE 3000

CMD cd home/app && node index.js && cd .. && npm start