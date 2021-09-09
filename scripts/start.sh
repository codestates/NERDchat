#!/bin/bash
sudo chmod -R 777 /home/ubuntu/server
cd /home/ubuntu/server
npm i
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8080
authbind --deep pm2 start index.js --watch