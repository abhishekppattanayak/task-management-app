FROM mongo:latest

EXPOSE 27017

WORKDIR /usr/src/app

COPY mongod.conf /etc/mongod.conf

CMD ["mongod", "--config", "/etc/mongod.conf"]