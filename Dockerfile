FROM node:11

RUN apt-get update && apt-get install unzip

WORKDIR /home/node
ADD arcgis-web-appbuilder-2.19.zip .

RUN unzip -q arcgis-web-appbuilder-2.19.zip && \
    rm arcgis-web-appbuilder-2.19.zip

VOLUME /home/node/ArcGISWebAppBuilder/server/apps
VOLUME /home/node/ArcGISWebAppBuilder/client/stemapp/widgets

EXPOSE 3344
WORKDIR /home/node/ArcGISWebAppBuilder/server
CMD [ "node", "server.js" ]
