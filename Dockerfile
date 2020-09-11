FROM node:12
MAINTAINER Brian H Wilson "brian@wildsong.biz"

USER node
WORKDIR /home/node
ADD arcgis-web-appbuilder-2.17.zip .
RUN unzip arcgis-web-appbuilder-2.17.zip

EXPOSE 3344/tcp 3345/tcp 3346/tcp

WORKDIR /home/node/WebAppBuilderForArcGIS/client/stemapp/widgets

# This part won't work outside our intranet
# I could add a startup script that clones the widgets each time the container
# starts but then it would overwrite changes made. 
# I don't like having to put secrets into .env to log into the server and
# I don't like having a fixed list of widgets to clone in the Docker image
# but it's working for now.
ENV GIT_SSL_NO_VERIFY true
ARG GITSERVER
RUN git clone ${GITSERVER}/widget-eSearch.git eSearch && \
    git clone ${GITSERVER}/widget-PopupPanel.git PopupPanel && \
    git clone ${GITSERVER}/widget-PrintCC.git PrintCC && \
    git clone ${GITSERVER}/widget-Search.git SearchCC && \
    git clone ${GITSERVER}/widget-Traverse.git Traverse

WORKDIR /home/node/WebAppBuilderForArcGIS/server

#ENTRYPOINT [ "bash" ]
ENTRYPOINT [ "node", "server.js" ]
