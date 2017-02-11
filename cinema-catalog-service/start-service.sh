#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f catalog-service

docker rmi catalog-service

docker image prune

docker volume prune

docker build -t catalog-service .

docker run --name catalog-service -l=apiRoute='/cinemas' -p 3001:3000 --env-file env -d catalog-service
