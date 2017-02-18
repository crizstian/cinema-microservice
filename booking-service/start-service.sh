#!/usr/bin/env bash

docker service create --replicas 1 --name booking-service -l=apiRoute='/booking' -p 3002:3000 --env-file env crizstian/booking-service
