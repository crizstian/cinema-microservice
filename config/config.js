const dbSettings = {
  db: 'movies',
  user: 'cristian',
  pass: 'cristianPassword2017',
  repl: 'rs1',
  servers: [
   { ip: '192.168.99.100', port: 27017 },
   { ip: '192.168.99.101', port: 27017 },
   { ip: '192.168.99.102', port: 27017 }
  ]
}

const serverSettings = {
  port: process.env.PORT || 3000
}

module.exports = {
  dbSettings,
  serverSettings
}
