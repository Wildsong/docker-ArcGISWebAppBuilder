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

The Esri code is in ArcGISWebAppBuilder/

The apps that are generated will be in apps/

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
http://name:3344/ \
https://name:3344/ \
http://name.domain:3344/ \
https://name.domain:3344/ \

That gets you the App Id which you can take back to the WAB web page in the "unsigned" step above,
using cut and paste to copy it into the browser.

### Signing WABDE again should you ever need to

You can create a new container or you can remove the file
ArcGISWebAppBuilder/server/signininfo.json to disconnect from your
Portal and trigger the web page that prompts for the key again. This
basically takes the image back to the "unsigned state".

## Future enhancements 

I have played with adding a web-based file manager so that users could directly
transfer files but I have not found one that I like yet. Please send suggestions.

Personally I use the command line all the time so it's not a requirement for me.

### Widget management

I am working out the best way to work with 3rd party widgets. They
need to be copied into clients/stemapp/widgets where the existing
widgets live. This is confusing, I don't know why they don't have 2
spaces. But that's life.
