FROM node:7
MAINTAINER Daniel Tam

RUN mkdir -p /usr/api
COPY . /usr/api
WORKDIR /usr/api
RUN npm install

ENV PORT 3000
EXPOSE  $PORT

CMD ["npm", "start"]