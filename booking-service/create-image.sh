#!/usr/bin/env bash

docker rm -f booking-service

docker rmi booking-service

docker image prune

docker volume prune

docker build -t booking-service .
