# docker-WebAppBuilderForArcGIS
Runs ESRI "Web AppBuilder For ArcGIS (Developer edition)" (WABDE) in a Docker container.

I have tested this process with versions 2.13 and 2.14

## Prerequisites 

* A working copy of ArcGIS Enterprise Portal or an ArcGIS Online "organizational" account.
* A server that can run the docker container.

# License

This project will not download licensed code WABDE from Esri.
Use your ESRI account to do the download first. (A free account works.)

# Set up

## Download and unzip.

Find the ZIP file at the ESRI site
[Web App Builder](https://developers.arcgis.com/web-appbuilder/)
under "Getting Started" and download it.  Unzip it here in this folder.

When done you should have a folder "WebAppBuilderForArcGIS".

## Networking note

I run my WebAppBuilder directly on the network (no proxy) at port
3344, the default. You might do it some other way.

## Build image

Use "make build".

## Run

Use "make unsigned" or use this command to start the NodeJS server running on port 3344
in unconfigured mode. You will need the App ID from Portal to do the next step.

    docker run -it --rm -p 3344:3344 wabde-unsigned

## Capture signin creds

I have not been able to get the server app to accept any other
signininfo.json than the one it creates. That means I have to commit
an image once it's set up. So while the wabde-unsigned image is
running, I connect via browser and give it the URL and AppId from
Portal.  That creates a new signininfo.json file, which I need to
persist. So then I run this command to capture the new image.

    docker commit wabde-unsigned wabde

Having done this I can now run wabde and it won't ask for AppId again.

### Volumes for storage

There are two volumes used by WABDE, they are /home/node/apps and /home/node/widgets
and they are mounted at esri_widgets and esri_apps

### Deployment

    docker-compose up -d

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

    docker exec -it webappbuilder "rm signininfo.json"

Then refresh the browser connection to WAB and it should prompt again for AppId.

