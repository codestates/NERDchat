#!/bin/bash
sudo chmod -R 777 /home/ubuntu/server
cd /home/ubuntu/server
npm i
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
sudo iptables -A PREROUTING -t nat -i eth0 -p tcp --dport 443 -j REDIRECT --to-port 8080

export ACCESS_SECRET=$(aws ssm get-parameters --region us-east-1 --names ACCESS_SECRET --query Parameters[0].Value | sed 's/"//g')
export DATABASE_NAME=$(aws ssm get-parameters --region us-east-1 --names DATABASE_NAME --query Parameters[0].Value | sed 's/"//g')
export DATABASE_PASSWORD=$(aws ssm get-parameters --region us-east-1 --names DATABASE_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export DATABASE_USER=$(aws ssm get-parameters --region us-east-1 --names DATABASE_USER --query Parameters[0].Value | sed 's/"//g')
export HOST=$(aws ssm get-parameters --region us-east-1 --names HOST --query Parameters[0].Value | sed 's/"//g')
export REDIS_HOST=$(aws ssm get-parameters --region us-east-1 --names REDIS_HOST --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region us-east-1 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js --watch