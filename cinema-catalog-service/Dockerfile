# Node v7 as the base image to support ES6
FROM node:7.5.0

# Create a new user to our new container and avoid the root user
RUN useradd --user-group --create-home --shell /bin/false nupp && \
    apt-get clean

ENV HOME=/home/nupp

COPY package.json npm-shrinkwrap.json $HOME/app/

COPY src/ $HOME/app/src

RUN chown -R nupp:nupp $HOME/* /usr/local/

WORKDIR $HOME/app
RUN npm cache clean && \
    npm install --silent --progress=false --production

RUN chown -R nupp:nupp $HOME/*
USER nupp

EXPOSE 3000

CMD ["npm", "start"]
