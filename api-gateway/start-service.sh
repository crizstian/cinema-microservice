#!/usr/bin/env bash

for server in manager1 worker1 worker2
do
    eval `docker-machine env $server`

    echo $(env | grep DOCKER)

    docker rm -f api-gateway-service

    docker rmi api-gateway-service

    docker image prune

    docker volume prune

    docker build -t api-gateway-service .

    docker run --name api-gateway-service -v /Users/Cramirez/.docker/machine/machines/$server:/certs --net='host' --env-file env -d api-gateway-service

done
