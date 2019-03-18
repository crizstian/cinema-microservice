#!/usr/bin/env bash

docker rm -f movies-service:v0.1

docker rmi movies-service:v0.1

docker image prune

docker volume prune

docker build -t movies-service:v0.1 .

docker tag movies-service:v0.1 crizstian/movies-service:v0.1

docker push crizstian/movies-service:v0.1
