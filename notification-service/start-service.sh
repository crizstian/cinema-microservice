#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f notification-service

docker rmi notification-service

docker image prune

docker volume prune

docker build -t notification-service .

docker run --name notification-service -l=apiRoute='/notification' -p 3004:3000 --env-file env --env-file env2 -d notification-service
