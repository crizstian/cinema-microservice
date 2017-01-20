'use strict'
const {EventEmitter} = require('events')
const server = require('./server/server')
const repository = require('./repository/repository')
const config = require('./config/config')
const mongo = require('./config/mongo')
const mediator = new EventEmitter()

console.log('--- Movies Service ---')
console.log('Connecting to movies repository...')

process.on('uncaughtException', (err) => {
  console.error('Unhandled Exception', err)
})

process.on('uncaughtRejection', (err, promise) => {
  console.error('Unhandled Rejection', err)
})

mediator.on('db.ready', (db) => {
  repository.connect(db)
    .then(repo => {
      console.log('Connected. Starting Server')

      return server.start({
        port: config.serverSettings.port,
        repo
      })
    })
    .then(app => {
      console.log(`Server started succesfully, running on port: ${config.serverSettings.port}.`)
      app.on('close', () =>{
        repo.disconnect()
      })
    })
})

mediator.on('db.error', (err) => {
  console.error(err)
})

mongo.connect(config.dbSettings, mediator)

mediator.emit('boot.ready')
