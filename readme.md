# Build a NodeJS microservice and deploy it to Kubernetes

### Stack
We’ll use a simple NodeJS service with a MongoDB for our backend.
- NodeJS 7.5.0
- MongoDB 3.4.2
- Docker 20.10.11

### Microservices

- [Movies Service example](./movies-service)
- [Cinema Catalog Service example](./cinema-catalog-service)
- [Booking Service example](./booking-service)
- [Payment Service example](./payment-service)
- [Notification Service example](./notification-service)
- [API Gateway Service example](./api-gateway)

### How to run the cinema microservice

We need to have docker and kubernetes installed previously.

Please input server.crt and server.key contents in `deploy/kubernetes/configmap/**/*.yaml`

```
$ ./build.sh setup-container-images
$ ./deploy.sh kubernetes apply|delete|diff
```

This will basically create every microservice container image

and deploy every docker service in the swarm.

### TODO

- Persistent Volume for MongoDB

### LICENSE
The MIT License (MIT)

Copyright (c) 2017 Cristian Ramirez

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
