#!/usr/bin/env bash

docker rm -f booking-service

docker rmi booking-service

docker image prune

docker volume prune

docker build -t booking-service:v0.1 .

docker tag booking-service:v0.1 crizstian/booking-service:v0.1

docker push crizstian/booking-service:v0.1