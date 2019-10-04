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

You can use your own name if you want. This one is kind of long.
```
docker build -t wildsong/WebAppAppBuilderForArcGIS .
```

# Run

This command will start the NodeJS server running on port 3344.
As noted elsewhere you have to run it somewhere reachable from your Portal; if you try to run it from a Windows 10 Desktop
chances are your local firewall will prevent this. I run it under Debian to avoid messing with my firewall settings.

```
docker run --name=webappbuilder WebAppBuilderForArcGIS
```

## Portal set up

Once it is up and running you still .
Set up requires that you connect to it from a browser (e.g. http://yourdocker:3344/) and
enter the URL of your Portal and an AppId. On the Portal side you have to set up 
a new App and get the AppId. Complete relatively good instructions are on the ESRI web site under Quick Start.
