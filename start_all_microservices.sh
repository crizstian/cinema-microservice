#!/usr/bin/env bash

eval `docker-machine env manager1`

docker rm -f movies-service
docker rm -f catalog-service
docker rm -f booking-service
docker rm -f payment-service
docker rm -f notification-service

docker rmi -f movies-service
docker rmi -f catalog-service
docker rmi -f booking-service
docker rmi -f payment-service
docker rmi -f notification-service


array=('./movies-service'
  './cinema-catalog-service'
  './booking-service'
  './payment-service'
  './notification-service'
)

for ((i = 0; i < ${#array[@]}; ++i)); do
    cd ${array[$i]}
    sh ./start-service.sh
    cd ..
done
