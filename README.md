# docker-ArcGISWebAppBuilder

Runs Esri "ArcGIS Web AppBuilder (Developer edition)" (aka WABDE) in a Docker container.

I have tested this process with WABDE versions 2.13-2.19 on Debian Linux.

## Licenses

The folder "ArcGISWebAppBuilder" contains a complete unmodified copy of 
Esri "ArcGIS Web AppBuilder (Developer edition)". Per Esri licensing,
Esri allows redistribution without modification.

Esri widgets - all the code in the widgets directory (inside
ArcGISWebAppBuilder) is covered by a permissive [Apache 2.0
license](http://www.apache.org/licenses/LICENSE-2.0).  You can change
it anyway you want but don't sent pull requests to me because I will
be keeping the code in sync with Esri's. Send them to Esri.

The rest of the project (the parts I wrote) are covered under the permissive MIT
license as described in the file LICENSE.

## Prerequisites 

* A working ArcGIS Enterprise Portal with admin access or an ArcGIS Online "organizational" account.
* A computer that has Docker and Docker Compose installed.

Note that you can set up a developer account for free.

## Volumes for storage

The Esri code is in ArcGISWebAppBuilder/x

### apps and db volumes

The apps that are generated will be in apps/. There is a separate
folder that has to be kept in sync, db/. Let WABDE do that part.

The app and db folders have to be writeable by the 'node' user, but if
you let Docker create them then they will be owned by root and
therefore not writeable.

### widgets volume

Supposedly I could let Docker create widgets on its first run
and it would copy the files for me, but for some reason it's not working.

SOOOO... I copy them when I create the git repository and update it.
Brute force approach.

Widgets are stored in the "client" side of WABDE then copied to
"server" side into the apps folder when you create an app in WABDE.
I mount the widgets/ folder from Docker.

You can add your own or 3rd party widgets there. It's up to you to
preserve them in your own way. Doing "git pull" will not overwrite
them unless you modify Esri's widgets. Don't do that, make copies
instead and modify the copies.

### logs volume

If your server folder is mounted read-only you will get a complaint about
logs folder. You can either mount read-write, create and mount a logs directory,
or do what I do, ignore the error. Log messages will still go to STDOUT if you do.

## Running it

Run this if you use Docker Compose,

```bash
docker-compose up -d
```

Or if you use Docker Swarm,

```bash
    docker stack deploy -c docker-compose.yml wabde
```

## Setting the App Id from Portal

Once the container is up and running you still have to connect it to Portal (or ArcGIS Online)..
Connect to WABDE from a browser (e.g. <http://localhost:3344/webappbuilder/>) and
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
I have no idea which one, move along nothing to see here. Avoid stupid redirect errors.
http://name:3344/ \
https://name:3344/ \
http://name.domain:3344/ \
https://name.domain:3344/ \

That gets you the App Id which you can take back to the WAB web page in the "unsigned" step above,
using cut and paste to copy it into the browser.

### Saving the signin file

Once you have successfully connected you can copy the file out and put it back
after upgrades, if you want. Instead of re-entering the ID you copy the file.
Same amount of work, either way.

```bash
cp ArcGISWebAppBuilder/server/signininfo.json .
```

The file should look like signininfo.json.SAMPLE with the fields properly filled in.

### Force signing in WABDE again should you ever need to

If you can remove the file ArcGISWebAppBuilder/server/signininfo.json
and restart the container, it will disconnect WABDE from your Portal
and trigger the web page that prompts for the key again. This
basically takes the image back to the "unsigned state".

## Backups

Note that the ArcGISWebAppBuilder/ folder is mounted read-only in the Docker.
Only the apps/ and db/ folders are writable. If you want to back up your
apps folder, make sure you also backup (and restore) the db/apps file. They
have to match.

## Future enhancements 

I have played with adding a web-based file manager so that users could directly
transfer files but I have not found one that I like yet. Please send suggestions.

Personally I use the command line all the time so it's not a requirement for me.

### Widget management

I am working out the best way to work with 3rd party widgets. They
need to be copied into clients/stemapp/widgets where the existing
widgets live. This is confusing, I don't know why they don't have 2
spaces. But that's life.
