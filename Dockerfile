FROM node:18
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm i
COPY . .
RUN npx tsc
CMD [ "npm", "run", "start" ]
