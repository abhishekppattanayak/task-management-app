FROM denoland/deno:2.1.3

EXPOSE 8000

WORKDIR /app

ENV DATABASE_URL = mongodb://mongo-container:27017

COPY . /app/

CMD ["deno", "task", "dev"]