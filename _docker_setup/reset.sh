#!/usr/bin/env bash

eval `docker-machine env manager1`

docker service rm movies-service notification-service cinema-catalog-service payment-service booking-service

for server in manager1 worker1 worker2
do
  eval `docker-machine env $server`

  for image in crizstian/movies-service crizstian/cinema-catalog-service crizstian/booking-service crizstian/payment-service crizstian/notification-service
    do
      IMAGE=$(docker images $image -q)
      docker rmi -f $IMAGE
  done
done
