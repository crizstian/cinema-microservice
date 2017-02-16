#!/usr/bin/env bash

docker rm -f movies-service

docker rmi movies-service

docker image prune

docker volume prune

docker build -t movies-service .
