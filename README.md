# docker-ArcGISWebAppBuilder

Runs
[Esri "ArcGIS Web AppBuilder (Developer edition)"](https://developers.arcgis.com/web-appbuilder/)
(aka WABDE) in a
[Docker container](https://hub.docker.com/repository/docker/wildsong/wabde).
This version is based on version 2.19 (released January 2021).

The main purpose of this Docker is to facilitate developing widgets and I describe my
workflow in this README. You can just use it to run WABDE and build apps, too.

I have tested this process with WABDE versions 2.13-2.19 on Debian Linux.
I've also done some limited testing on Windows 10 Desktop using Docker WSL2.


## Licenses

The github repo contains a complete unmodified copy of Esri "ArcGIS
Web AppBuilder (Developer edition)" in the file
arcgis-web-appbuilder-2.19.zip. The file will be unpacked into a
Docker image by the build process.

Per Esri licensing, Esri allows redistribution of this software
without modification.  For details, you can refer to these Esri
licenses as referenced in their code. Look at 
<http://js.arcgis.com/3.15/esri/copyright.txt> and
<http://www.arcgis.com/apps/webappbuilder/copyright.txt>.

Esri widgets - all the code in the widgets directory (inside
ArcGISWebAppBuilder) is covered by a permissive [Apache 2.0
license](http://www.apache.org/licenses/LICENSE-2.0).  You can change
it anyway you want but don't send pull requests to me because I will
be keeping the code in sync with Esri's. Send them to Esri. ;-)

The Wildsong part of the project is covered under the permissive MIT
license as described in the file LICENSE in this repository.

## Version of NodeJS

The base Docker image is "node:11". Everything here works fine with Node 12,
but I found source for a sample widget that flipped out with Node 12
so I backed off to 11 for now. WABDE requires at least 4.2 so we're good there.

## Prerequisites 

* A working ArcGIS Enterprise Portal with admin access or an ArcGIS Online "organizational" account.
* A computer that has Docker and Docker Compose installed.

Note that you can set up an Esri developer account for free.

## Volumes for storage

I tried using 'bind' mounts but they don't work for widgets; 
only the Docker volumes work properly for that.

You can use either bind mounts or volumes for apps and db. Currently
I use bind mounts for apps because it lets me easily develop widgets
using Visual Studio Code. (VS Code can see directly into the apps/
folder.)

### apps and db volumes

The apps that are generated will be in "apps". There is a separate
folder that has to be kept in sync, "db".

I am trying to put the data that needs to be persisted into volumes
so that it can be upgraded across version updates from Esri, which happen
roughly quarterly I think.

Apps and db are empty at first run so they are pretty easy to deal with.
There's also "widgets".

### widgets volume

Widgets are stored in the "client" side of WABDE then copied to
"server" side into the apps folder when you create an app in WABDE.
Normally any widgets you see in "apps" folders started life in the
client "widgets" collection and they were copied during app creation.

On first run, the container will copy the internal widgets folder
into a fresh new Docker volume called wabde_widgets.

Once that's happened then you can install third party widgets into it
and they will be available in the app builder.

If you use a bind mount for widgets instead of a Docker volume, the
automatic copy fails and you won't have any widgets!

### logs 

You can create a separate logs folder if you want. I have not worked
with WABDE long enough in one container to know what happens over
time. Log files might grow endlessly. Caveat emptor.

## Upgrades

When doing upgrades, I have found I can leave apps and db volumes
alone. To get widgets from the new version, it's easiest to delete the
old widgets volume and let Docker create and populate a new one.

```bash
docker volume rm wabde_widgets
```

If you have altered anything in there or added extra custom or 3rd party
widgets, it's up to you to preserve them.

Warning: WABDE tries to update widgets in apps when it's started, if
you have an old app with standard widgets WABDE will overwrite
them. It's up to you to manage any code you change.

## Running WABDE

Just using docker commands, you could do this. (Skip the "build" step
if you want to pull the image from Docker Hub.) This puts all volumes in Docker volumes,
creating them if they don't exist.

```bash
docker build -t wildsong/wabde .
docker run -d --name wabde \
   -v wabde_apps:/srv/server/apps \
   -v wabde_db:/srv/server/db \
   -v wabde_widgets:/srv/client/stemapp/widgets \
   -p 3344:3344 wildsong/wabde
```

Sigh, on Windows, I don't know where it puts the volumes, they are
hidden in a WSL2 virtual machine somewhere. You can still access them
using the docker commands. (I have to break the habit of accessing
them directly on Linux systems.)

Run this if you use Docker Compose,
(again, skip the "--build" if you want to pull the image from Docker Hub.)

```bash
docker-compose up -d --build
```

This example YML file shows a bind mount of the apps folder instead of a volume, which allows
directly accessing the widgets folders for development in apps/*/widgets.
It also bind mounts the signininfo.json file.

```
docker-compose -f docker-bind.yml up 
```

Here is an example YML file shows that you can have the configuration
set up for an ArcGIS Online account at the same time, and start
whichever one you want to use.  It bind mounts "apps_agol" instead of
"apps", and keeps a separate db/ volume for the databases.  It also
bind mounts the signininfo-agol.json onto the container's
signininfo.json file.

```
docker-compose -f docker-agol.yml up 
```

### Setting the App Id from Portal

Once the container is up and running you still have to connect it to
Portal (or ArcGIS Online)..  Connect to WABDE from a browser
(e.g. <http://localhost:3344/webappbuilder/>) and enter the URL of
your Portal and an AppId (from Portal). On the Portal side you have to
set up a new App and get the AppId. Complete relatively good
instructions are on the ESRI web site under Quick Start.

In Portal,

* Content tab->My Content
* Add Item->Application
* Type of application: Application
* Purpose: Ready to use
* API: Javascript
* URL: https://hostname:3344/webappbuilder
* Title: whatever you like
* Tags: whatever...
Then you have to co into the settings for the new "Application"
and "register" to get an AppId. Under "App Registration",
* App Type: Browser
* Redirect URI: I wrestle with this everytime so I enter all variations, one of them works,
I have no idea which one. Avoid stupid frustrating URI redirect errors. It does not hurt
to have too many.

https://localhost:3344/ \
https://hostname:3344/ \
https://hostname.domain:3344/

"hostname" can be "localhost" if you are only working on your local desktop.
Otherwise it needs to be the name of the machine as you access it, that is, on my network
"testmaps" is only accessible inside my network but it still works to create an AppId.

Once you have that precicous App Id, you can take back to the initial WABDE web page,
using cut and paste to copy it into the browser.

### Saving the signin file

I use a bind mount in the "bind" examples above, so I keep the signininfo.json
file in the local filesystem.

You can also just leave it inside the Docker container. 
Once you have successfully connected you can copy the file out to save it and put it back
after upgrades, if you want. Instead of re-entering the ID you copy the file.
Same amount of work, either way. Here is an example of how to back it up.

```bash
docker cp wabde:/srv/server/signininfo.json .
```

The file should look like the signininfo.json.SAMPLE with the fields properly filled in.

BTW you can copy files into and out of containers, even when they are stopped.

### Force signing in WABDE again should you ever need to

If you remove the file /srv/server/signininfo.json and reload the web
page, it will disconnect WABDE from your Portal and trigger the web
page that prompts for the key again. This basically takes the image
back to the "unsigned state".

## Backups

If you want to back up your apps folder, make sure you also backup
(and restore) the db/apps file. They have to match.

## Docker Hub

I tried automated builds but the ZIP file is stored in github LFS (Large File Store),
and apparently they are not supporting that yet. So I do a manual push,

```bash
docker push wildsong/wabde:latest
docker push wildsong/wabde:2.19
```

## Future enhancements

### Development workflow

I just started with this part today, stay tuned. It's the whole reason the project exists.

Step 1, create an app in WABDE. Use the default template, because it's
the only one that allows you to adjust themes and widgets. If it's the
first one in your WABDE instance then the app will be "2". Subsequent
apps will be incremented.

Step 2, using a template, create a new widget in git. I have a very
simple template now, Wildsong/arcgis-wab-widget-template.

Step 3, you can put the template into the widgets volume if you want,
to avoid hand editing apps/2/config.json or you can break down and
just edit that file. It's not that hard.

I needed to have write access to the apps/ volume, so I switched to
using a bind mount for apps, it's just easier for this. On Linux you
probably have to change ownership because things created by WABDE will
be owned by root. For example, "sudo chown -R bwilson apps/2/widgets".

Step 4, run your app. You should be able to open the widget and see
its generic HTML code.

Step 5, edit, test, repeat, you know this endless cycle. Push changes
to git as needed.

Once you have perfected your widget you can use git to deploy a copy
into the widgets/ volume for inclusion into future projects directly
via WABDE.


### 3D

I have not thought about 3D apps yet so nothing here addresses it. It would
at a minimum probably require a separate widgets volume.

### File management

I have played with adding a web-based file manager so that users could directly
transfer files but I have not found one that I like yet. Please send suggestions.

### App deployment

App deployment is a whole chore that should be automated but probably beyond the scope
of this project. 


