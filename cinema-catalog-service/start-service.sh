#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f catalog-service

docker rmi catalog-service

docker image prune

docker volume prune

docker build -t catalog-service .

docker run --name catalog-service -p 3000:3000 --env-file env -d catalog-service
