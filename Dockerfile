FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g npm && npm i -g yarn
RUN yarn install

COPY . .

EXPOSE 5000

CMD ["yarn", "start"]
