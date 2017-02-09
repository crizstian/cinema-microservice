#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f payment-service

docker rmi payment-service

docker image prune

docker volume prune

docker build -t payment-service .

docker run --name payment-service -p 3002:3000 --env-file env -d payment-service
