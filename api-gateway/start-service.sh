#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f api-gateway-service

docker rmi api-gateway-service

docker image prune

docker volume prune

docker build -t api-gateway-service .

docker run --name api-gateway-service -v /Users/Cramirez/.docker/machine/machines/manager1:/certs -p 3005:3000 --env-file env -d api-gateway-service
