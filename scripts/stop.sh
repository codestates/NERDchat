#! /bin/bash
sudo chmod -R 777 /home/ubuntu/server
cd /home/ubuntu/server
sudo pm2 stop index 2> /dev/null || true
sudo pm2 delete index 2> /dev/null || true