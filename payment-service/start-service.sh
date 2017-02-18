#!/usr/bin/env bash

docker service create --replicas 1 --name payment-service -l=apiRoute='/payment' -p 3003:3000 --env-file env crizstian/payment-service
