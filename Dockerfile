FROM node:11
MAINTAINER Brian H Wilson "brian@wildsong.biz"

RUN apt-get update && apt-get -y install unzip

WORKDIR /home/node
ADD arcgis-web-appbuilder-2.19.zip .

RUN unzip -q arcgis-web-appbuilder-2.19.zip && \
    rm arcgis-web-appbuilder-2.19.zip

VOLUME /home/node/ArcGISWebAppBuilder/server/apps
VOLUME /home/node/ArcGISWebAppBuilder/server/db
VOLUME /home/node/ArcGISWebAppBuilder/client/stemapp/widgets

EXPOSE 3344/tcp 3345/tcp 3346/tcp
WORKDIR /home/node/ArcGISWebAppBuilder/server
CMD [ "node", "server.js" ]
