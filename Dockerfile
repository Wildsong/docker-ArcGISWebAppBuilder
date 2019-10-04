FROM node:8
MAINTAINER Brian H Wilson "brian@wildsong.biz"

WORKDIR /home/node
COPY WebAppBuilderForArcGIS .

EXPOSE 3344/tcp 3345/tcp 3346/tcp

WORKDIR /home/node/server
CMD node server.js
