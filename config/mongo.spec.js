const should = require('should')
const mongo = require('./mongo')
const {dbOptions} = require('./config')
const EventEmitter = require('events')


describe('Mongo Connection', () => {

  it('should connect with an EventEmitter', () => {
    const mediator = new EventEmitter()
    mongo.connect(mediator, dbOptions)

    mediator.on('db.ready', (db) => {
      console.log('fuck yea')
      console.log(db)
    })

    mediator.on('db.error', (err) => {
      console.log('fuck!!!!!')

      console.log(err)
    })

    mediator.emit('boot.ready')
  })


})
