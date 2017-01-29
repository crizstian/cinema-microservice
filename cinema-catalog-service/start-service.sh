#!/usr/bin/env bash

eval `docker-machine env manager1`

docker volume rm $(docker volume ls -qf dangling=true)

docker build -t catalog-service .

docker run --name catalog-service -p 3000:3000 --env-file env -d catalog-service
