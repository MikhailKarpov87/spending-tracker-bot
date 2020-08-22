ARG nodeVersion
FROM node:$nodeVersion-alpine
RUN apk add --update tini
WORKDIR /home/frontend
COPY ./package.json ./webpack.config.js ./babel.config.js ./env.js ./tslint.json ./tsconfig.json ./jest.config.js ./
COPY ./src ./src
RUN npm install && npm cache clean -f
CMD ["/sbin/tini", "npm", "run", "build"]