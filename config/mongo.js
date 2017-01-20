const MongoClient = require('mongodb')
const test = require('assert')

const getMongoURL = (options) => {
  let url = 'mongodb://'

  options.servers.forEach((server) => {
    url += `${server.ip}:${server.port},`
  })

  return `${url.substr(0, url.length - 1)}/${options.db}`
}

const connect = (options, mediator) => {
  MongoClient.connect(getMongoURL(options), {
    db: {
      w: 'majority',
      wtimeout: 10000,
      j: true,
      readPreference: 'ReadPreference.SECONDARY_PREFERRED',
      native_parser:false,
    },
    server: {
      autoReconnect: true,
      poolSize: 10,
      socketoptions: {
        keepAlive: 300,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
      }
    },
    replset: {
      replicaSet: options.repl,
      ha: true,
      haInterval: 10000,
      poolSize: 10,
      socketoptions: {
        keepAlive: 300,
        connectTimeoutMS: 30000,
        socketTimeoutMS: 30000
      }
    }
  }, function (err, db) {
    if (err) {
      mediator.emit('db.error', err)
    }
    // Use the admin database for the operation
    const adminDb = db.admin()

    // Authenticate using the newly added user
    adminDb.authenticate(options.user, options.pass, (err, result) => {
      if (err) {
        mediator.emit('db.error', err)
      }
      mediator.emit('db.ready', db)
    })
  })
}

// connect(require('./config').dbOptions)

module.exports.connect = connect
