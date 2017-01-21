const MongoClient = require('mongodb')

const getMongoURL = (options) => {
  const url = options.servers
    .reduce((prev, cur) => prev + `${cur.ip}:${cur.port},`, 'mongodb://')

  return `${url.substr(0, url.length - 1)}/${options.db}`
}

const dbParameters = () => ({
  w: 'majority',
  wtimeout: 10000,
  j: true,
  readPreference: 'ReadPreference.SECONDARY_PREFERRED',
  native_parser:false
})

const serverParameters = () => ({
  autoReconnect: true,
  poolSize: 10,
  socketoptions: {
    keepAlive: 300,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
  }
})

const replsetParameters = (replset = 'rs1') => ({
  replicaSet: replset,
  ha: true,
  haInterval: 10000,
  poolSize: 10,
  socketoptions: {
    keepAlive: 300,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000
  }
})

const connect = (options, mediator) => {
  mediator.once('boot.ready', () => {
    MongoClient.connect(
      getMongoURL(options), {
        db: dbParameters(),
        server: serverParameters(),
        replset: replsetParameters(options.repl)
      }, (err, db) => {
        if (err) {
          mediator.emit('db.error', err)
        }

        db.admin().authenticate(options.user, options.pass, (err, result) => {
          if (err) {
            mediator.emit('db.error', err)
          }
          mediator.emit('db.ready', db)
        })
      })
  })
}

module.exports.connect = connect
