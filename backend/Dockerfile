FROM node:12-alpine
RUN apk add --update tini
WORKDIR /home/backend
COPY ./package.json ./tslint.json ./tsconfig.json ./
RUN npm install && npm cache clean -f
CMD ["/sbin/tini", "npm", "start"]