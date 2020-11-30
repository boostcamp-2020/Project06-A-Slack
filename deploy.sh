#!/bin/bash

git checkout master
git fetch

head=`git rev-parse HEAD`
origin=`git rev-parse origin/master`

if [ $head != $origin ]; then
        git pull
        cd /root/Project06-A-Slack/server
        npm i
        npm run build
        npm run start
        cd /root/Project06-A-Slack/client
        npm i
        npm run build
        pm2 reload app
fi
echo 'finish!'
