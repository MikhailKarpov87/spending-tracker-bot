FROM node:10-alpine
RUN apk add --update tini
WORKDIR /home/backend
COPY ./package.json .env ./
RUN npm install && npm cache clean -f
CMD ["/sbin/tini", "npm", "start"]