#!/usr/bin/env bash

eval `docker-machine env manager1`

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
