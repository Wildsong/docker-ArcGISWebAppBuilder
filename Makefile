all:	WebAppBuilderForArcGIS widgets build

WebAppBuilderForArcGIS: arcgis-web-appbuilder-2.13.zip
	unzip arcgis-web-appbuilder-2.13.zip 

widgets:
	cp -r WebAppBuilderForArcGIS/client/stemapp/widgets/ widgets/

# The signed image is created by connecting to Delta for authentication.
# So, first build the unsigned image with "make build".
# Then, connect, then stop the container and save it as the signed container by doing "make commit".
# Then you can run "make daemon".

build:	Dockerfile
	docker build -t wabde-unsigned .

unsigned:
	docker run -it --rm -p 3344:3344 -v ${PWD}/widgets:/home/node/widgets -v ${PWD}/apps:/home/apps --network=host --name=wabde-unsigned wabde-unsigned

signed:
	docker run -it --rm -p 3344:3344 -v ${PWD}/widgets:/home/node/widgets -v ${PWD}/apps:/home/apps wabde

daemon:
	docker run -d --restart=always -p 3344:3344 -v ${PWD}/widgets:/home/node/widgets -v ${PWD}/apps:/home/apps --name=wabde wabde

commit:
	docker commit wabde-unsigned wabde

exec:
	docker exec -it wabde-unsigned bash

clean:
	docker stop wabde
	docker rm wabde
	docker rm wabde-unsigned


