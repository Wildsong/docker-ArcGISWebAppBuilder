# docker-WebAppBuilderForArcGIS
Runs ESRI "Web AppBuilder For ArcGIS (Developer edition)" (WABDE) in a Docker container.

I have tested the process described here with versions 2.13-2.16 on
Debian Linux.  I am sorry for how awkward it is, but that's ESRI for
you. They don't always make things easy.

## Prerequisites 

* A working ArcGIS Enterprise Portal with admin access or an ArcGIS Online "organizational" account.
* A server that has Docker and "make" installed.

## License

This project will not download licensed code WABDE from Esri, you have
to sign in to do that. (A free ESRI developer account works.)  Use
your ESRI account to do the download first.

## Download.

Find the ZIP file at the ESRI site, look here 
[Web App Builder](https://developers.arcgis.com/web-appbuilder/)
under "Getting Started" and download it. The link is "Download the SDK".

You don't need to unzip it, the Makefile will do that.
If you are upgrading, remove the WebAppBuilderForArcGIS folder.

## Networking note

I run my WebAppBuilder directly on the local network (no proxy) at
port 3344, the default. I don't expose it to the internet so I don't
need to proxy it.

## Build image

1. Use "make". This will unzip the archive, and then build
the image "wabde-unsigned".

2. Use "make unsigned" to start the NodeJS server running on port 3344 in
unconfigured mode.  This starts a container running wabde-unsigned.
You will need to obtain an App ID from Portal to connect WABDE with
Portal. (Obtaining the id is covered below in a separate section.)

At this point you will be able to see the new WABDE running, look at

    http://server:3344/

where "server" is the right name for you of course. It should be prompting
you for initial credentials now.

3. Capture signin creds

I have not been able to get the server app to accept any other
signininfo.json than the one it creates. That means I have to commit
an image once it's set up.

While the "wabde-unsigned" container is running, connect via browser
and give it the URL and AppId from Portal.  That creates a new
signininfo.json file, which I need to persist.

To capture the signed image, run "make commit". This command creates
the new image called "wabde".
    
Having done this you can run wabde and it won't ask for AppId again.

### Volumes for storage

There are two volumes used by WABDE, they are /home/node/apps and /home/node/widgets
and they are mounted at esri_widgets and esri_apps. They will be created for you
when you run "make unsigned" if they don't already exist.

### Copy widgets to storage

The command "make widgets" copies the widget files that you downloaded
as part of "WebAppBuilderForArcGIS" into the esri_widgets volume. I
might make this part of the Dockerfile eventually.

For now, it's up to you to figure out how to get files into your widgets folder.
Once they are on your server you can use docker's cp commad, for example

    unzip mynewwidget.zip
    docker cp mynewwidget/ wabde:/home/node/widgets

(The docker command is probably not accurate if you use Docker Swarm. Needs updating.)

In a moment or two the running wabde will see new files and the widgets will show up there.
You will have to refresh your browser, if you are looking at the widgets page.

### Deployment

You have several options now, I recently migrated from Docker Compose
to Docker Swarm and also two 'make' commands.

#### Option 1. Using Swarm (preferred)

A few warnings will be generated because there are options only intended for Compose. Ignore them.

   docker stack deploy -c docker-compose.yml wabde

#### Option 2. Using Compose.

    docker-compose up -d

#### Option 3. Just using Docker.

    make daemon

## Getting the App Id from Portal

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
* URL: https://yourdocker:3344/webappbuilder
* Title: whatever you like
* Tags: whatever...
Then you have to co into the settings for the new "Web Mapping Application"
and "register" to get an AppId. Under "App Registration",
* App Type: Browser
* Redirect URI: I wrestle with this everytime so I enter all variations, one of them works,
http://name:3344/ 
https://name:3344/ 
http://name.domain:3344/ 
https://name.domain:3344/ 

That gets you the App Id which you can take back to the WAB web page in the "unsigned" step above,
using cut and paste to copy it into the browser.

### Signing WABDE again should you ever need to

To change the client ID later, I had to delete signininfo.json
file from the Docker and restart it. This basically takes it back to the "unsigned state".
With the wabde container running from another command line I did this:

    docker exec -it wabde-unsigned rm /home/node/server/signininfo.json

Then refresh the browser connection to WAB and it should prompt again for AppId.

## Future enhancements

I have played with adding a web-based file manager so that users could directly
transfer files but I have not found one that I like yet. Please send suggestions.

Personally I use the command line all the time so it's not a requirement for me.
