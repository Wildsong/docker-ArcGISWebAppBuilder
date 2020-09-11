# docker-WebAppBuilderForArcGIS
Runs ESRI "Web AppBuilder For ArcGIS (Developer edition)" (WABDE) in a Docker container.

I have tested this process with versions 2.13, 2.14, 2.15, 2.17 on Debian Linux.

## Prerequisites 

* A working ArcGIS Enterprise Portal with admin access or an ArcGIS Online "organizational" account.
* A server that has Docker and Docker Compose installed.

## License

This project will not download licensed code WABDE from Esri, you have
to sign in to do that. (A free ESRI developer account works.)
Use your ESRI account to do the download first.

## Download the SDK.

Find the ZIP file at the ESRI site, look here 
[Web App Builder](https://developers.arcgis.com/web-appbuilder/)
under "Getting Started" and download it. You don't need to unzip it.

## Networking note

I run my WebAppBuilder directly on the network (no proxy) at port
3344, the default. You might do it some other way. It is only accessible
on our intranet so there is no proxy for it.

## Getting the App Id from Portal

On the Portal side you have to set up a new App and get the AppId. Complete
relatively good instructions are on the ESRI web site under Quick Start.

In Portal,

* Content tab->My Content
* Add Item->Application
* Type of application: Web Mapping
* Purpose: Ready to use
* API: Javascript
* URL: https://yourdocker:3344/webappbuilder   NOTE YOU MUST USE HTTPS not HTTP!!!!!!
* Title: whatever you like
* Tags: whatever...
Then you have to co into the settings for the new "Web Mapping Application"
and "register" to get an AppId. Under "App Registration",
* App Type: Browser
* Redirect URI: I used https://yourdocker.yourdomain

That gets you the App Id which you need for the next step.

## Build image

NOTE: You have to set the AppId first (previous step) because the file
will be copied into the image that is built in this step.

   docker-compose build
   
This builds the image "wildsong/wabde".

### Volumes for storage

There is one volume used by WABDE, mounted in the contaier at
/home/node/widgets. It will if it does not already exist.

### Copy widgets to storage

The command "make widgets" will copy the widget files downloaded in
"WebAppBuilderForArcGIS" into the esri_widgets volume.

### Deployment

Run this

    docker-compose up -d
or
  
    docker stack deploy -c docker-compose.yml wabde

For now, it's up to you to figure out how to get files into your widgets folder.
Once they are on your server you can use docker's cp commad, for example

    unzip mynewwidget.zip
    docker cp mynewwidget/ wabde:/home/node/widgets

In a moment or two the running wabde will see new files and the widget will show up there.
You will have to refresh your browser, if you are looking at the widgets page.

## Re-signing WABDE

You can create a new container or you can shell in to the running one
and remove server/signininfo.json to disconnect from your Portal and
trigger the web page that prompts for the key again. This basically
takes the image back to the "unsigned state".

Then refresh the browser connection to WAB and it should prompt for AppId.

