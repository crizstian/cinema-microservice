#!/usr/bin/env bash

eval `docker-machine env manager1`

docker build -t catalog-service .

docker run --name catalog-service -p 443:3433 -d catalog-service
