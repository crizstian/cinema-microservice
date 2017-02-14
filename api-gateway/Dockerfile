# Node v7 as the base image to support ES6
FROM node:7.5.0

ENV HOME=/home/nupp

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY src/ $HOME/app/src

WORKDIR $HOME/app
RUN npm cache clean && \
    npm install --silent --progress=false --production


CMD ["npm", "start"]
