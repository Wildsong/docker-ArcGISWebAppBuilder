all:	WebAppBuilderForArcGIS widgets build

WebAppBuilderForArcGIS: arcgis-web-appbuilder-2.13.zip
	unzip arcgis-web-appbuilder-2.13.zip 

widgets:
	cp -r WebAppBuilderForArcGIS/client/stemapp/widgets/ widgets/

build:	Dockerfile
	docker build -t wabde-unsigned .

unsigned:
	docker run -it --rm -p 3344:3344 -v ${PWD}/widgets:/home/node/widgets --network=host --name=wabde-unsigned wabde-unsigned

signed:
	docker run -it --rm -p 3344:3344 -v ${PWD}/widgets:/home/node/widgets wabde

daemon:
	docker run -d --restart=always -p 3344:3344 -v ${PWD}/widgets:/home/node/widgets --name=wabde wabde

commit:
	docker commit wabde-unsigned wabde

exec:
	docker exec -it wabde-unsigned bash

clean:
	docker stop wabde
	docker rm wabde
	docker rm wabde-unsigned


