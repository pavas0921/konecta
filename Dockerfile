
FROM node:16.18

COPY . /app


WORKDIR /app




RUN npm install


RUN npx prisma db push







EXPOSE 4000


CMD ["node", "server.js"]
