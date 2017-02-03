## Build a NodeJS microservice and deploy it to Docker

[![Standard - JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

Example of the **cinema catalog service** microservice and API.

![](https://cdn-images-1.medium.com/max/1600/1*oj7mSGXTnnMBDVYeqE3SRw.png)

To import the database used for this repo and article run the following command on your MongoDB env:
First we need to do a `$ docker cp file mongoNodeContainer:/tmp`

```
$ docker exec mongoNode{number} bash -c 'mongoimport --db cinemas --collection countries --file /tmp/countries.json --jsonArray -u $MONGO_USER_ADMIN -p $MONGO_PASS_ADMIN --authenticationDatabase "admin"'

$ docker exec mongoNode{number} bash -c 'mongoimport --db cinemas --collection states --file /tmp/states.json --jsonArray -u $MONGO_USER_ADMIN -p $MONGO_PASS_ADMIN --authenticationDatabase "admin"'

$ docker exec mongoNode{number} bash -c 'mongoimport --db cinemas --collection cities --file /tmp/cities.json --jsonArray -u $MONGO_USER_ADMIN -p $MONGO_PASS_ADMIN --authenticationDatabase "admin"'

$ docker exec mongoNode{number} bash -c 'mongoimport --db cinemas --collection cinemas --file /tmp/cinemas.json --jsonArray -u $MONGO_USER_ADMIN -p $MONGO_PASS_ADMIN --authenticationDatabase "admin"'
```

### Stack
- NodeJS V7
- MongoDB 3.4.1
- Docker for Mac 1.12.6

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
