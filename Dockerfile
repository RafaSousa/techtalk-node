FROM node:latest
MAINTAINER mike.coleman@docker.com
# set default workdir
WORKDIR /usr/src/server
# Add package.json to allow for caching
COPY package.json /usr/src/server/package.json
# Install app dependencies
RUN npm install
# Bundle app source
COPY server.js /usr/src/server
# user to non-privileged user
USER nobody
# Expose the application port and run application
EXPOSE 5000
CMD ["node","server.js"]