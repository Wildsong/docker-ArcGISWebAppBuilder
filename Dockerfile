FROM node:12
MAINTAINER Brian H Wilson "brian@wildsong.biz"

USER node
COPY WebAppBuilderForArcGIS /home/node/

#VOLUME /home/node/WebAppBuilderForArcGIS/client/stemapp/widgets
EXPOSE 3344/tcp 3345/tcp 3346/tcp

WORKDIR /home/node/server
CMD node server.js
