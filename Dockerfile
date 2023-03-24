FROM node:11
LABEL MAINTAINER="Brian H Wilson brian@wildsong.biz"

# Add unzip, which we currently don't need...
#RUN apt-get update && apt-get -y install unzip

# The node server will run as user 1000
# so it will need permissions to write into /srv
RUN chown 1000:1000 /srv
WORKDIR /srv
USER 1000:1000

VOLUME /srv

# Server will not start unless current directory is "server".
WORKDIR /srv/server

