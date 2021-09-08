#! /bin/bash
sudo chmod -R 777 /home/ubuntu/
cd /home/ubuntu/
pm2 stop index 2> /dev/null || true
pm2 delete index 2> /dev/null || true