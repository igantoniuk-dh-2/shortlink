FROM node:18-alpine
WORKDIR /shortlink
COPY ./package.json .
RUN mkdir /node_modules
RUN chown -R node:node /node_modules
RUN yarn install
COPY . .
EXPOSE 3000
ENV NODE_ENV=production
CMD ["npm", "run", "start"]% 