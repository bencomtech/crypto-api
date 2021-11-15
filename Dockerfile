FROM node:16

ENV TZ="Asia/Bangkok"

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 7000

CMD [ "npm", "start" ]