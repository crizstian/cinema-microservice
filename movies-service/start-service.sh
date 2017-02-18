#!/usr/bin/env bash

docker service create --replicas 1 --name movies-service -l=apiRoute='/movies' -p 3000:3000 crizstian/movies-service
