FROM node:12
MAINTAINER Brian H Wilson "brian@wildsong.biz"

USER node
ADD --chown=node WebAppBuilderForArcGIS /home/node/

# Make way for our widgets
WORKDIR /home/node
RUN mkdir widgets && \
    cd client/stemapp && \
    rm -rf widgets && \
    ln -s ../../widgets 

VOLUME /home/node/widgets
EXPOSE 3344/tcp 3345/tcp 3346/tcp

WORKDIR /home/node/server
CMD node server.js
