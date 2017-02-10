var monitor = require('node-docker-monitor')
var http = require('http')
var httpProxy = require('http-proxy')
var parseurl = require('parseurl')

// process input via env vars
var dockerOpts = { socketPath: process.env.DOCKER_SOCKET }
if (!dockerOpts.socketPath) {
  dockerOpts.host = process.env.DOCKER_HOST
  dockerOpts.port = process.env.DOCKER_PORT
  if (!dockerOpts.host) {
    dockerOpts.socketPath = '/var/run/docker.sock'
  }
}
var httpPort = process.env.HTTP_HOST || 8080

// available routes collection
var routes = {
    // '303c56be38b748576be1598eb9d6a746fb2792c5c9c6d83608ed8f2b5501b063' : {
    //     apiRoute: '/service1',
    //     upstreamUrl: 'http://127.0.0.1:8887'
    // }
}

console.log('Connecting to Docker: %j', dockerOpts)

monitor({
  onContainerUp: function (containerInfo, docker) {
    if (containerInfo.Labels && containerInfo.Labels.api_route) {
            // register a new route if container has "api_route" label defined
      var container = docker.getContainer(containerInfo.Id)
            // get running container details
      container.inspect(function (err, containerDetails) {
        if (err) {
          console.log('Error getting container details for: %j', containerInfo, err)
        } else {
          try {
                        // prepare and register a new route
            var route = {
              apiRoute: containerInfo.Labels.api_route,
              upstreamUrl: getUpstreamUrl(containerDetails)
            }

            routes[containerInfo.Id] = route
            console.log('Registered new api route: %j', route)
          } catch (e) {
            console.log('Error creating new api route for: %j', containerDetails, e)
          }
        }
      })
    }
  },

  onContainerDown: function (container) {
    if (container.Labels && container.Labels.api_route) {
            // remove existing route when container goes down
      var route = routes[container.Id]
      if (route) {
        delete routes[container.Id]
        console.log('Removed api route: %j', route)
      }
    }
  }
}, dockerOpts)

// create and start http server
var server = http.createServer(function (req, res) {
  for (id in routes) {
    if (routes.hasOwnProperty(id) && handleRoute(routes[id], req, res)) {
      return
    }
  }

  returnError(req, res)
})

console.log('API gateway is listening on port: %d', httpPort)
server.listen(httpPort)

// create proxy
var proxy = httpProxy.createProxyServer()
proxy.on('error', function (err, req, res) {
  returnError(req, res)
})

// proxy HTTP request / response to / from destination upstream service if route matches
function handleRoute (route, req, res) {
  var url = req.url
  var parsedUrl = parseurl(req)

  if (parsedUrl.path.indexOf(route.apiRoute) === 0) {
    req.url = url.replace(route.apiRoute, '')
    proxy.web(req, res, { target: route.upstreamUrl })
    return true
  }
}

// generate upstream url from containerDetails
function getUpstreamUrl (containerDetails) {
  var ports = containerDetails.NetworkSettings.Ports
  for (id in ports) {
    if (ports.hasOwnProperty(id)) {
      return 'http://' + containerDetails.NetworkSettings.IPAddress + ':' + id.split('/')[0]
    }
  }
}

// send 502 response to the client in case of an error
function returnError (req, res) {
  res.writeHead(502, {'Content-Type': 'text/plain'})
  res.write('Bad Gateway for: ' + req.url)
  res.end()
}

// 'use strict'
// const {EventEmitter} = require('events')
// const server = require('./server/server')
// const repository = require('./repository/repository')
// const di = require('./config')
// const mediator = new EventEmitter()
//
// console.log('--- Booking Service ---')
// console.log('Connecting to movies repository...')
//
// process.on('uncaughtException', (err) => {
//   console.error('Unhandled Exception', err)
// })
//
// process.on('uncaughtRejection', (err, promise) => {
//   console.error('Unhandled Rejection', err)
// })
//
// mediator.on('di.ready', (container) => {
//   repository.connect(container)
//     .then(repo => {
//       console.log('Connected. Starting Server')
//       container.registerValue({repo})
//       return server.start(container)
//     })
//     .then(app => {
//       console.log(`Server started succesfully, running on port: ${container.cradle.serverSettings.port}.`)
//       app.on('close', () => {
//         container.resolve('repo').disconnect()
//       })
//     })
// })
//
// di.init(mediator)
//
// mediator.emit('init')
