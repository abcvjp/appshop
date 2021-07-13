FROM node:16-alpine3.11
WORKDIR /api
COPY ./package.json /api
RUN npm install
CMD ["npm", "run", "dev"]