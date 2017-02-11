'use strict'
const {EventEmitter} = require('events')
const server = require('./server/server')
const docker = require('./docker/docker')
const di = require('./config')
const mediator = new EventEmitter()

console.log('--- API Gateway Service ---')
console.log('Connecting to API repository...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

mediator.on('di.ready', (container) => {
  docker.discoverRoutes(container)
    .then(routes => {
      console.log('Connected. Starting Server')
      container.registerValue({routes})
      return server.start(container)
    })
    .then(app => {
      console.log(`Connected to Docker: ${container.cradle.dockerSettings.host}`)
      console.log(`Server started succesfully, API Gateway running on port: ${container.cradle.serverSettings.port}.`)
      app.on('close', () => {
        console.log('Server finished')
      })
    })
})

di.init(mediator)

mediator.emit('init')
