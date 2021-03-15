#!/bin/bash -x

# This part won't work outside our intranet

# define this in your .env file, only fer real.
#GITSERVER=https://USERNAME:PASSWORD@cc-codebase.clatsop.co.clatsop.or.us/git
source .env

#cd widgets

GIT_SSL_NO_VERIFY=true

# I name them all with a "_CC" so I can tell they are our additions.

git clone ${GITSERVER}/widget-eSearch.git CC_eSearch
git clone ${GITSERVER}/widget-PopupPanel.git CC_PopupPanel
git clone ${GITSERVER}/widget-Search.git CC_Search
git clone ${GITSERVER}/widget-Traverse.git CC_Traverse



