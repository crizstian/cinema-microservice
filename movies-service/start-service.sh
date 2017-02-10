#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f movies-service

docker rmi movies-service

docker image prune

docker volume prune

docker build -t movies-service .

docker run --name movies-service -p 443:3000 -d movies-service
