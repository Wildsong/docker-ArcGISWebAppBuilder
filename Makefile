VERSION=2.16

all:	build

WebAppBuilderForArcGIS: arcgis-web-appbuilder-${VERSION}.zip
	unzip arcgis-web-appbuilder-${VERSION}.zip 

# Copy the widgets from source. 
widgets: WebAppBuilderForArcGIS/client/stemapp/widgets
	docker run --rm -v $<:/src -v esri_widgets:/widgets busybox cp -r /src/* /widgets

# Backup and restore for widgets and apps; container can be stopped or running.
backup: 
	docker cp wabde:/home/node/widgets - > widgets.tar
	docker cp wabde:/home/node/apps - > apps.tar
restore: widgets.tar apps.tar
	cat widgets.tar | docker cp - wabde:/home/node
	cat apps.tar | docker cp - wabde:/home/node


# The signed image is created by connecting to Delta for authentication.
# So, first build the unsigned image with "make build".
# Then run the unsigned container with "make unsigned" and connect to its URL.
# Then stop the container and save it as the signed container by doing "make commit".
# Then you can run "make daemon".

build:	WebAppBuilderForArcGIS Dockerfile
	docker build -t wabde-unsigned .

unsigned:
	docker run -it --rm -p 3344:3344 -v esri_widgets:/home/node/widgets -v esri_apps:/home/node/apps --network=host --name=wabde-unsigned wabde-unsigned

local:
	docker run -it --rm -p 3344:3344 -v ${PWD}/widgets:/home/node/widgets -v ${PWD}/apps:/home/node/apps --name=wabde wabde

daemon:
	docker run -d --restart=always -p 3344:3344 -v esri_widgets:/home/node/widgets -v esri_apps:/home/node/apps --name=wabde wabde

commit:
	docker commit wabde-unsigned wabde

exec:
	docker exec -it wabde-unsigned bash

clean:
	docker stop wabde
	docker rm wabde
	docker rm wabde-unsigned


