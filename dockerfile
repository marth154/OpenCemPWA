FROM node:14
WORKDIR /usr/src/app
ENV PORT 3000
COPY . ./

# building the app
RUN yarn
RUN yarn build

# Running the app
CMD [ "yarn", "start" ]