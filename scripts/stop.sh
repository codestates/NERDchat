#!/bin/bash
sudo chmod -R 777 /home/ubuntu/server
cd /home/ubuntu/server
npm i pm2 -g
sudo pm2 update
sudo pm2 delete cluster 2> /dev/null
