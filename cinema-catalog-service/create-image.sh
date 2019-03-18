#!/usr/bin/env bash

docker rm -f cinema-catalog-service:v0.1

docker rmi cinema-catalog-service:v0.1

docker image prune

docker volume prune

docker build -t cinema-catalog-service:v0.1 .

docker tag cinema-catalog-service:v0.1 crizstian/cinema-catalog-service:v0.1

docker push crizstian/cinema-catalog-service:v0.1