docker-machine create -d virtualbox --virtualbox-disk-size "20000" --virtualbox-memory "2048" manager1
docker-machine create -d virtualbox --virtualbox-disk-size "20000" --virtualbox-memory "2048" worker1
docker-machine create -d virtualbox --virtualbox-disk-size "20000" --virtualbox-memory "2048" worker2

cd ..

cd mongo-replica

sh ./create-replica-set.sh

cd ..

cd cinema-microservice

sh ./start_all_microservices.sh
