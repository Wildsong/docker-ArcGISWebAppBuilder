source .env
docker service create --name=wabde --replicas=1 \
  -p 3344:3344 \
  --mount type=bind,src=/etc/localtime,dst=/etc/localtime,ro=true \
  --mount type=bind,src=/etc/timezone,dst=/etc/timezone,ro=true \
  --mount type=volume,src=esri_apps,dst=/home/node/apps,ro=false \
  --mount type=volume,src=esri_widgets,dst=/home/node/widgets,ro=false \
  wabde:latest
