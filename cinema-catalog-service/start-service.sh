#!/usr/bin/env bash

docker service create --replicas 1 --name cinema-catalog-service -l=apiRoute='/cinemas' -p 3001:3000 --env-file env crizstian/cinema-catalog-service
