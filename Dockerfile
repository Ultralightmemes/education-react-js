FROM node:16.16.0-alpine

WORKDIR usr/src/app

COPY package*.json .

RUN npm install

COPY . .

#CMD npm install -g serve

EXPOSE $PORT

CMD ["npm", "start"]