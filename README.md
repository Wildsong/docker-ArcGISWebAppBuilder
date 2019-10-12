# docker-WebAppBuilderForArcGIS
Runs ESRI "Web AppBuilder For ArcGIS (Developer edition)" (WABDE) in a Docker container.

## Prerequisites 

* A working copy of ArcGIS Enterprise Portal or an ArcGIS Online "organizational" account.
* A server that can run the docker container.

# License

This project will not download licensed code WABDE from Esri.
Use your ESRI account to do the download first. (A free account works.)

# Set up

## Download and unzip.

Find the ZIP file at the ESRI site [Web App Builder](https://developers.arcgis.com/web-appbuilder/) under Getting Started and download it. Unzip it here in this folder.

When done you should have a folder "WebAppBuilderForArcGIS".

## Networking note

I run my WebAppBuilder directly on the network (no proxy) at port
3344, the default. You might do it some other way.  There is an EXPOSE
line in the Dockerfile to expose the ports that it uses.

## Build image

If you have "make" installed you can just invoke it, it will do the build
and then start a container, for testing. 

Otherwise the command to build could be

docker build -t wabde-unsigned .

You can use your own name instead of "wabde" if you want.
(It has to be all lowercase.)

## Run

This command will start the NodeJS server running on port 3344.

    docker run -it --rm -p 3344:3344 wabde-unsigned

## Capture signin creds

For the life of me I have not been able to get the server app to accept any other signininfo.json
than the one it creates. That means I have to commit an image once it's set up. So while the
wabde-unsigned image is running, I connect via browser and give it the URL and AppId from Portal.

Then I run this command to capture the new image.

    docker commit wabde-unsigned wabde


### Volumes for storage

You will want a couple volumes hooked up to the container, one for
widgets and one for the output files that will be shared with a web
server.

    tbd

## Deployment

Once convinced it's running you can make it stick around with:

    docker run -d --restart=always --name=wabde -p 3344:3344 wabde

## Portal set up

Once it is up and running you still have to connect it to Portal.
Connect to WAB first from a browser (e.g. http://yourdockerserver:3344/webappbuilder/) and
enter the URL of your Portal and an AppId (from Portal). On the Portal
side you have to set up a new App and get the AppId. Complete
relatively good instructions are on the ESRI web site under Quick Start.

In Portal,
* Content tab->My Content
* Add Item->Application
* Type of application: Web Mapping
* Purpose: Ready to use
* API: Javascript
* URL: http://yourdocker:3344/webappbuilder
* Title: whatever you like
* Tags: whatever...
Then you have to co into the settings for the new "Web Mapping Application"
and "register" to get an AppId. Under "App Registration",
* App Type: Browser
* Redirect URI: I used http://yourdocker.yourdomain

That gets you the AppId which you can take back to the WAB web page.

To change the client ID later, I had to delete signininfo.json
file from the Docker and restart it.
With the docker running from another command line I do this:
```
docker exec -it webappbuilder "rm signininfo.json"
```
Then refresh the browser connection to WAB and it should prompt again for AppId.

