FROM denoland/deno:2.1.3

EXPOSE 5173

WORKDIR /app

ENV VITE_SERVER_URL=http://localhost:8000

COPY . /app/

CMD ["deno", "task", "dev"]