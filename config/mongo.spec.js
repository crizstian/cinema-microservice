const should = require('should')
const test = require('assert')
const mongo = require('./mongo')
const {dbOptions} = require('./config')
const {EventEmitter} = require('events')


describe('Mongo Connection', () => {

  it('should connect with an EventEmitter', (done) => {
    const mediator = new EventEmitter()

    mediator.on('db.ready', (db) => {
      db.admin().listDatabases(function(err, dbs) {
        test.equal(null, err)
        test.ok(dbs.databases.length > 0)
        console.log(dbs.databases)
        db.close()
        done()
      })
    })

    mediator.on('db.error', (err) => {
      console.log(err)
    })

    mongo.connect(dbOptions, mediator)

    mediator.emit('boot.ready')
  })
})


// const MongoClient = require('mongodb')
// const test = require('assert')
//
// const getMongoURL = (options) => {
//   let url = 'mongodb://'
//
//   options.servers.forEach((server) => {
//     url += `${server.ip}:${server.port},`
//   })
//
//   return `${url.substr(0, url.length - 1)}/${options.db}`
// }
//
// MongoClient.connect(getMongoURL(dbOptions), {
//   db: {
//     w: 'majority',
//     wtimeout: 10000,
//     j: true,
//     readPreference: 'ReadPreference.SECONDARY_PREFERRED',
//     native_parser:false,
//   },
//   server: {
//     autoReconnect: true,
//     poolSize: 10,
//     socketdbOptions: {
//       keepAlive: 300,
//       connectTimeoutMS: 30000,
//       socketTimeoutMS: 30000
//     }
//   },
//   replset: {
//     replicaSet: dbOptions.repl,
//     ha: true,
//     haInterval: 10000,
//     poolSize: 10,
//     socketdbOptions: {
//       keepAlive: 300,
//       connectTimeoutMS: 30000,
//       socketTimeoutMS: 30000
//     }
//   }
// }, function (err, db) {
//   // Use the admin database for the operation
//   const adminDb = db.admin()
//
//   // Authenticate using the newly added user
//   adminDb.authenticate(dbOptions.user, dbOptions.pass, (err, result) => {
//     if (err) {
//       console.log(err)
//     }
//     adminDb.listDatabases(function(err, dbs) {
//       test.equal(null, err)
//       test.ok(dbs.databases.length > 0)
//       console.log(dbs.databases)
//       db.close()
//     })
//   })
// })
