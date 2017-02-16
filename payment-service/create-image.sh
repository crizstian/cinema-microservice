#!/usr/bin/env bash

docker rm -f payment-service

docker rmi payment-service

docker image prune

docker volume prune

docker build -t payment-service .
