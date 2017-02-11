#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f booking-service

docker rmi booking-service

docker image prune

docker volume prune

docker build -t booking-service .

docker run --name booking-service -l=apiRoute='/booking' -p 3002:3000 --env-file env -d booking-service
