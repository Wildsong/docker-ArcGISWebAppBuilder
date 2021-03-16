FROM node:11
MAINTAINER Brian H Wilson "brian@wildsong.biz"

RUN apt-get update && apt-get -y install unzip

WORKDIR /srv

# Unzip WABDE into /srv
ADD arcgis-web-appbuilder-2.19.zip .
RUN unzip -q arcgis-web-appbuilder-2.19.zip && \
    rm arcgis-web-appbuilder-2.19.zip && \
    mv ArcGISWebAppBuilder/* .

# Just a convenient shortcut,"/srv/widgets".
RUN ln -s /srv/client/stemapp/widgets

VOLUME /srv/server/apps
VOLUME /srv/server/db
VOLUME /srv/client/stemapp/widgets

EXPOSE 3344/tcp 3345/tcp 3346/tcp

# Server will not start unless current directory is "server".
WORKDIR /srv/server
CMD [ "node", "server.js" ]
