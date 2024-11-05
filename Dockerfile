FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm rebuild bcrypt --build-from-source

COPY . .

RUN npm install -g typescript

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
