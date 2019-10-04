# docker-WebAppBuilderForArcGIS
Runs ESRI WebAppBuilderForArcGIS (Developer edition) in a Docker container.

# Prerequisites 

A working copy of ArcGIS Enterprise Portal.
A server that can run the docker container.
The docker server has to be visible to Portal; it can have a name or an IP address.

# License

This initial version of the docker will not download code from Esri.
Come back later for that. This version requires that you use your
ESRI account to do the download first. (A free account works.)

# Set up

## Download and unzip.

You will find the ZIP file at the ESRI site [Web App Builder](https://developers.arcgis.com/web-appbuilder/) under Getting Started.

You should have a folder "WebAppBuilderForArcGIS".

## Networking note

I run my WebAppBuilder directly on the network (no proxy) at port 3344, the default. You might do it some other way.
There is an EXPOSE line in the Dockerfile to expose the ports that it uses.

## Build image

If you have "make" installed you can just invoke it, it will do the build
and then start a container, for testing. 

Otherwise the command to build could be
```
docker build -t webappappbuilderforarcgis .
```
You can use your own name instead of "webappappbuilderforarcgis" if you want. This one is long.
(It has to be all lowercase.)

# Run

This command will start the NodeJS server running on port 3344.
As noted elsewhere you have to run it somewhere reachable from your
Portal; if you try to run it from a Windows 10 Desktop chances are
your local firewall will prevent this. I run it under Debian to avoid
messing with my firewall settings. 

I am running a proxy in front of this container so it's visible
under a different name outside the machine, and shows up on port 80.


## Portal set up

Once it is up and running you still have to connect it to Portal.
Connect to WAB first from a browser (e.g. http://yourdocker:3344/) and
enter the URL of your Portal and an AppId (from Portal). On the Portal
side you have to set up a new App and get the AppId. Complete
relatively good instructions are on the ESRI web site under Quick
Start.

In Portal,
* Content tab->My Content
* Add Item->Application
* Type of application: Web Mapping
* Purpose: Ready to use
* API: Javascript
* URL: http://yourdocker.yourdomain:3344/webappbuilder
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
