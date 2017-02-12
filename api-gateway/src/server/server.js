'use strict'
const express = require('express')
const proxy = require('http-proxy-middleware')
const parseurl = require('parseurl')

const start = (container) => {
  return new Promise((resolve, reject) => {
    const {port} = container.resolve('serverSettings')
    const routes = container.resolve('routes')

    if (!routes) {
      reject(new Error('The server must be started with routes discovered'))
    }
    if (!port) {
      reject(new Error('The server must be started with an available port'))
    }

    const app = express()
    for (const id in routes) {
      if (routes.hasOwnProperty(id)) {
        app.use(routes[id].apiRoute.toString(), proxy({
          target: routes[id].upstreamUrl,
          changeOrigin: true,
          logLevel: 'debug'
        }))
      }
    }

    const server = app.listen(port, () => resolve(server))
  })
}

module.exports = Object.assign({}, {start})
