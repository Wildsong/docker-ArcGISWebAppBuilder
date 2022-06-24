# docker-ArcGISWebAppBuilder

Runs
[Esri "ArcGIS Web AppBuilder (Developer edition)"](https://developers.arcgis.com/web-appbuilder/)
(aka WABDE) in a
[Docker container](https://hub.docker.com/repository/docker/wildsong/wabde).
This version is based on version 2.24 (released April 2022).

The main purpose of this Docker is to facilitate developing widgets
and I intend to describe my workflow in this README. You can just use
it to run WABDE and build apps, too.

I have tested this process with WABDE versions 2.13-2.24 on Debian Linux.
I've also done some limited testing on Windows 10 Desktop using Docker WSL2.

## Licenses

The github repo contains a complete unmodified copy of Esri "ArcGIS
Web AppBuilder (Developer edition)" in the file
arcgis-web-appbuilder-2.24.zip. The file will be unpacked into a
Docker image by the build process.

Per Esri licensing, Esri allows redistribution of this software
without modification.  For details, you can refer to these Esri
licenses as referenced in their code. Look at
<http://js.arcgis.com/3.15/esri/copyright.txt> and
<http://www.arcgis.com/apps/webappbuilder/copyright.txt>.

Esri widgets - all the code in the widgets directory (inside
ArcGISWebAppBuilder) is covered by a permissive [Apache 2.0
license](http://www.apache.org/licenses/LICENSE-2.0).  

The Wildsong part of the project is covered under the permissive MIT
license as described in the file LICENSE in this repository.

## Version of NodeJS

The base Docker image is "node:11". Everything here works fine with Node 12,
but I found source for a sample widget that flipped out with Node 12
so I backed off to 11 for now. WABDE requires at least 4.2 so we're good there.

## Prerequisites

* A working ArcGIS Enterprise Portal with admin access or an ArcGIS Online "organizational" account.
* A computer that has Docker and Docker Compose installed.

Note that you can set up a developer account for free, and that will work.

## Set up

To deal with the fact that you have to "migrate" from an
old version to a new version I ended up redoing a lot of this project. I used to keep this stuff in separate Docker volumes and gave up when figuring out how to use the upgrade procedures.

There are now release directories (currently for 2.20 and 2.24)
and inside each release directory there are widget and app folders.

Look in 2.24 for example you will see an unzipped version of the
WABDE files, and there will be files that change in these:

    client/stemapp/widgets/
    server/apps/
    server/logs/
    server/db/

When you install a new version you have to install any 
customized or third party widgets
you have added. I keep a list in CUSTOM_WIDGETS

In theory you must run upgrade.js to copy the apps from the old release to the new one, I will try that on the next release.
So far I have just copied everything and it seems to work.

## Upgrades

### Server upgrades

Download the ZIP, edit the version number in Dockerfile, build a new image.

When doing upgrades, I have found I can leave apps and db volumes
alone. To get widgets from the new version, it's easiest to move aside the
old widgets volume and let Docker create and populate a new one.

```bash
mv widgets widgets-OLD
mkdir widgets
```

If you have altered anything in there or added extra custom or 3rd party
widgets, it's up to you to preserve them.

### App upgrades

After installing a new release of WABDE, you can use
upgrade.js script to copy all the apps and build a new copy of the database.

2022-06-23 upgrade.js appears to do absolutely nothing at all.

Refer to <https://developers.arcgis.com/web-appbuilder/guide/upgrade-apps.htm>

WABDE has to be offline during the upgrade, so step one is

```bash
docker-compose down
```

```bash
docker run --rm -it -v $PWD/2.20:/old -v $PWD/2.24:/srv wabde_wabde bash
node upgrade /old 33
```

## Running WABDE

I don't use Windows because on Windows, I don't know where it puts the volumes, they are hidden in a WSL2 virtual machine somewhere. You can
still access them using the docker commands.

I tried running WABDE in Docker Swarm but I've decided it is just too much trouble.

```bash
docker-compose build
docker-compose up -d
```

The docker-compose.yml file uses a bind mount of 2.24
instead of Docker volumes.  This allows adding more widgets
directly into client/stemapp/widgets, and allows accessing the widgets folders for development in apps/*/widgets.

It also bind mounts the signininfo.json file 
to store the server and api key information.

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
* URL: <https://hostname:3344/webappbuilder>
* Title: whatever you like
* Tags: whatever...
Then you have to co into the settings for the new "Application"
and "register" to get an AppId. Under "App Registration",
* App Type: Browser
* Redirect URI: I wrestle with this everytime so I enter all variations, one of them works,
I have no idea which one. Avoid stupid frustrating URI redirect errors. It does not hurt
to have too many.

<https://localhost:3344/> \
<https://hostname:3344/> \
<https://hostname.domain:3344/>

"hostname" can be "localhost" if you are only working on your local desktop.
Otherwise it needs to be the name of the machine as you access it, that is, on my network
"testmaps" is only accessible inside my network but it still works to create an AppId.

Once you have that precicous App Id, you can take back to the initial WABDE web page,
using cut and paste to copy it into the browser.

### Saving the signin file

I use a bind mount in the "bind" examples above, so I keep the signininfo.json file in the local filesystem.

You can also just leave it inside the Docker container.
Once you have successfully connected you can copy the file out to save it and put it back after upgrades, if you want. Instead of re-entering the ID you copy the file. Same amount of work, either way. Here is an example of how to back it up.

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

## App deployment

App deployment should be automated but at this time, sadly I just use download and unzip at this time.

Somewhere around version 2.20, they broke the update process. We added some widgets to an existing project
and saved it and then deployed and all the Widget icons were broken. This is because the builder
started leaving explicit icon tags in the config.json file.

The Python toolbox "WABDE_toolbox.pyt" that is included in this repo will fix that by stripping them out.

After deploying, run the tool on the new config.json file.

## Development workflow

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

Step 4, run your app. You should be able to open the widget and see
its generic HTML code.

Step 5, edit, test, repeat, you know this endless cycle. Push changes
to git as needed.



