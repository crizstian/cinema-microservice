'use strict'
const http = require('http')
const httpProxy = require('http-proxy')
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

    // proxy HTTP request / response to / from destination upstream service if route matches
    const handleRoute = (route, req, res) => {
      const url = req.url
      const parsedUrl = parseurl(req)

      if (parsedUrl.path.indexOf(route.apiRoute) === 0) {
        req.url = url.replace(route.apiRoute, '')
        proxy.web(req, res, { target: route.upstreamUrl })
        return true
      }
    }

    // send 502 response to the client in case of an error
    const returnError = (req, res) => {
      res.writeHead(502, {'Content-Type': 'text/plain'})
      res.write('Bad Gateway for: ' + req.url)
      res.end()
    }

    // create and start http server
    const server = http.createServer((req, res) => {
      for (let id in routes) {
        if (routes.hasOwnProperty(id)) {
          handleRoute(routes[id], req, res)
        }
      }
      returnError(req, res)
    })

    // create proxy
    const proxy = httpProxy.createProxyServer()
    proxy.on('error', (err, req, res) => {
      if (err) {
        returnError(req, res)
      }
    })

    server.listen(port, () => {
      resolve(server)
    })
  })
}

module.exports = Object.assign({}, {start})
