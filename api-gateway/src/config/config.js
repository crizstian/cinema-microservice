const serverSettings = {
  port: process.env.PORT || 8080,
  ssl: require('./ssl')
}

// process input via env vars
const dockerSettings = {
  socketPath: '/var/run/docker.sock'
}

if (!dockerSettings.socketPath) {
  dockerSettings.host = '192.168.99.100'
  dockerSettings.port = ''
  if (!dockerSettings.host) {
    dockerSettings.socketPath = '/var/run/docker.sock'
  }
}

module.exports = Object.assign({}, { serverSettings, dockerSettings })
