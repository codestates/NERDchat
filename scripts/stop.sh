#! /bin/bash
cd /home/ubuntu/server
pm2 stop index 2> /dev/null || true
pm2 delete index 2> /dev/null || true