'use strict'
const mongo = require('mongodb')
const assert = require('assert')
const Server  = mongo.Server
const Db      = mongo.Db
const ReplSet = mongo.ReplSet

const addReplicaSetServers = (servers) => {
  const replSetServers = []

  servers.forEach((server) => {
    replSetServers.push(new Server(server.ip, server.port))
  })

  return replSetServers
}

const createReplicaSet = (replSetServers, ReplSetName) => {
  return new ReplSet(replSetServers, {
    rs_name                      : ReplSetName,
    ha                           : true,
    haInterval                   : 3000,
    reconnectWait                : 5000,
    connectWithNoPrimary         : true,
    poolSize                     : 10,
    read_secondary: true,
    readPreference: Server.READ_PRIMARY,
    slaveOk: true,
    secondaryAcceptableLatencyMS:500,
    stragegy: 'ping',
    socketOptions : {
      keepAlive : 300,
      connectTimeoutMS : 30000
    }
  })
}

const createDatabaseInstance = (options) => {

  const replSetServers = addReplicaSetServers(options.servers)
  const replicaSetConfig = createReplicaSet(replSetServers, options.repl)

  return new Db(options.db, replicaSetConfig, {
    w              : 'majority',
    j              : true,
    wtimeout       : 10000,
    readPreference : "ReadPreference.SECONDARY_PREFERRED", // the prefered read preference (Server.READ_PRIMARY, Server.READ_SECONDARY, Server.READ_SECONDARY_ONLY)
    native_parser:false,
    slaveOk: true ,
    maxPoolSize:1000,
    connectTimeoutMS:1000,
    socketTimeoutMS:1000
  })
}

module.exports.connect = (mediator, options) => {
  mediator.once('boot.ready', () => {
    console.log('BOOOOTEDDDD');
    const db = createDatabaseInstance(options)
    db.open(function (err) {
      console.log('OPEEEEEEENNNN');
      if (err) {
        mediator.emit('db.error', new Error(err))
      }
      db.admin().authenticate(options.user, options.pass, (err, result) => {
        assert.equal(result, true)
        mediator.emit('db.ready', db)
      })
    })
  })
}
