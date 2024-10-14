FROM node:20

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY ./prisma ./prisma
    

RUN npx prisma generate

RUN npm install -g nodemon
RUN npm install -g ts-node

COPY . .

RUN npx tsc -b

EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
