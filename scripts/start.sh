#! /bin/bash
sudo chmod -R 777 /home/ubuntu/server
cd /home/ubuntu/server/
authbind --deep pm2 start index.js