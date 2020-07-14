ARG nodeVersion
FROM node:$nodeVersion-alpine
RUN apk add --update tini
WORKDIR /home/bot
COPY ./package.json ./tslint.json ./tsconfig.json ./jest.config.js ./
COPY ./src ./src
RUN npm install && npm cache clean -f
CMD ["/sbin/tini", "npm", "start"]