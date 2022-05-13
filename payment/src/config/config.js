const dbSettings = {
  db: process.env.DB || 'payment',
  user: process.env.DB_USER || 'cristian',
  pass: process.env.DB_PASS || 'cristianPassword2017',
  repl: process.env.DB_REPLS || 'rs1',
  servers: (process.env.DB_SERVERS) ? process.env.DB_SERVERS.substr(1, process.env.DB_SERVERS.length - 2).split(' ') : [
    '192.168.99.100:27017',
    '192.168.99.101:27017',
    '192.168.99.102:27017'
  ],
  dbParameters: () => ({
    w: 'majority',
    wtimeout: 10000,
    j: true,
    readPreference: 'ReadPreference.SECONDARY_PREFERRED',
    native_parser: false
  }),
  serverParameters: () => ({
    autoReconnect: true,
    poolSize: 10,
    socketoptions: {
      keepAlive: 300,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 30000
    }
  }),
  replsetParameters: (replset = 'rs1') => ({
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
}

const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require('./ssl')
}

const stripeSettings = {
  secret: 'sk_test_lPPoJjmmbSjymtgo4r0O3z89',
  public: 'pk_test_l10342hIODZmOJsBpY6GVPHj'
}

module.exports = Object.assign({}, { dbSettings, serverSettings, stripeSettings })
