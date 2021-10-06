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
export REDIS_PASSWORD=$(aws ssm get-parameters --region us-east-1 --names REDIS_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export REFRESH_SECRET=$(aws ssm get-parameters --region us-east-1 --names REFRESH_SECRET --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_ID=$(aws ssm get-parameters --region us-east-1 --names GOOGLE_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export GOOGLE_CLIENT_SECRET=$(aws ssm get-parameters --region us-east-1 --names GOOGLE_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export FACEBOOK_CLIENT_ID=$(aws ssm get-parameters --region us-east-1 --names FACEBOOK_CLIENT_ID --query Parameters[0].Value | sed 's/"//g')
export FACEBOOK_CLIENT_SECRET=$(aws ssm get-parameters --region us-east-1 --names FACEBOOK_CLIENT_SECRET --query Parameters[0].Value | sed 's/"//g')
export KAKAO_REST_API_KEY=$(aws ssm get-parameters --region us-east-1 --names KAKAO_REST_API_KEY --query Parameters[0].Value | sed 's/"//g')
export ENDPOINT=$(aws ssm get-parameters --region us-east-1 --names ENDPOINT --query Parameters[0].Value | sed 's/"//g')
export GMAIL=$(aws ssm get-parameters --region us-east-1 --names GMAIL --query Parameters[0].Value | sed 's/"//g')
export GMAIL_PASSWORD=$(aws ssm get-parameters --region us-east-1 --names GMAIL_PASSWORD --query Parameters[0].Value | sed 's/"//g')
export accessKeyId=$(aws ssm get-parameters --region us-east-1 --names AccessKeyId --query Parameters[0].Value | sed 's/"//g')
export secretKey=$(aws ssm get-parameters --region us-east-1 --names SecretKey --query Parameters[0].Value | sed 's/"//g')
export region=$(aws ssm get-parameters --region us-east-1 --names Region --query Parameters[0].Value | sed 's/"//g')
export BUCKET_NAME=$(aws ssm get-parameters --region us-east-1 --names BUCKET_NAME --query Parameters[0].Value | sed 's/"//g')
export GO_HOME=$(aws ssm get-parameters --region us-east-1 --names GO_HOME --query Parameters[0].Value | sed 's/"//g')
export ORIGIN=$(aws ssm get-parameters --region us-east-1 --names ORIGIN --query Parameters[0].Value | sed 's/"//g')

authbind --deep pm2 start index.js --watch