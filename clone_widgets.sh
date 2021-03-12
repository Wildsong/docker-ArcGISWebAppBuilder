
I used to load these right into a Docker image via a Dockerfile.
I will finish setting this up tomorrow. It's late.


# This part won't work outside our intranet

GIT_SSL_NO_VERIFY=true

GITSERVER=https://USERNAME:PASSWORD@cc-codebase.clatsop.co.clatsop.or.us/git

cd ArcGISWebAppBuilder/client/stemapp/widgets

git clone ${GITSERVER}/widget-eSearch.git eSearch
git clone ${GITSERVER}/widget-PopupPanel.git PopupPanel
git clone ${GITSERVER}/widget-PrintCC.git PrintCC
git clone ${GITSERVER}/widget-Search.git SearchCC
git clone ${GITSERVER}/widget-Traverse.git Traverse



