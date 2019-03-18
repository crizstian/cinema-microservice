#!/usr/bin/env bash

docker rm -f payment-service:v0.1

docker rmi payment-service:v0.1

docker image prune

docker volume prune

docker build -t payment-service:v0.1 .

docker tag payment-service:v0.1 crizstian/payment-service:v0.1

docker push crizstian/payment-service:v0.1