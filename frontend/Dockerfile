FROM node:18-alpine
WORKDIR /home/frontend
COPY ./package.json .
RUN mkdir /node_modules
RUN chown -R node:node /node_modules
RUN yarn install
COPY . .
EXPOSE 3005
CMD ["npm", "run", "start"]