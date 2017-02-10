'use strict'
const monitor = require('node-docker-monitor')
const http = require('http')
const httpProxy = require('http-proxy')
const parseurl = require('parseurl')

const start = (container) => {
  return new Promise((resolve, reject) => {
    const {port, ssl} = container.resolve('serverSettings')
    const dockerSettings = container.resolve('dockerSettings')
    const repo = container.resolve('repo')

    if (!repo) {
      reject(new Error('The server must be started with a connected repository'))
    }
    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }

    console.log('Connecting to Docker: %j', dockerSettings)

    // available routes collection
    let routes = {}

    monitor({
      onContainerUp: function (container) {
        console.log('Container up: ', container)
      },

      onContainerDown: function (container) {
        console.log('Container down: ', container)
      }
    })

    const proxy = httpProxy.createProxyServer({target: 'http://localhost:9000'})

    http.createServer(function (req, res) {
      res.writeHead(200, { 'Content-Type': 'text/plain' })
      res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2))
      res.end()
    }).listen(9000)

    resolve(proxy)
  })
}

module.exports = Object.assign({}, {start})
