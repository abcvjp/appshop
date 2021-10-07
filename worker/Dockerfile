FROM node:16-alpine3.11
WORKDIR /worker
COPY ./package.json /worker
RUN npm install
CMD ["npm", "run", "dev"]