#!/usr/bin/env bash

docker service create --replicas 3 --name movies-service -l=apiRoute='/movies' -p 3000:3000 crizstian/movies-service
