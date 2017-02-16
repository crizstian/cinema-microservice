#!/usr/bin/env bash

docker rm -f notification-service

docker rmi notification-service

docker image prune

docker volume prune

docker build -t notification-service .
