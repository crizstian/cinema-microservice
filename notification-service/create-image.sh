#!/usr/bin/env bash

docker rm -f notification-service

docker rmi notification-service

docker image prune

docker volume prune

docker build -t notification-service:v0.1 .

docker tag notification-service:v0.1 crizstian/notification-service:v0.1

docker push crizstian/notification-service:v0.1