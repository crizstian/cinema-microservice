'use strict'
const Docker = require('dockerode')

const discoverRoutes = (container) => {
  const dockerSettings = container.resolve('dockerSettings')

  // generate upstream url from containerDetails
  const getUpstreamUrl = (containerDetails) => {
    const port = containerDetails.Ports[0].PublicPort
    return `https://${dockerSettings.host}:${port}`
  }

  return new Promise((resolve, reject) => {
    const docker = new Docker(dockerSettings)
    const routes = {}
    docker.listContainers((err, containers) => {
      if (err) {
        reject(new Error('an error occured listing containers, err: ' + err))
      }
      containers.forEach((containerInfo) => {
        if (!/mongo/.test(containerInfo.Names[0])) {
          routes[containerInfo.Id] = {
            name: containerInfo.Names[0],
            apiRoute: containerInfo.Names[0],
            upstreamUrl: getUpstreamUrl(containerInfo)
          }
        }
      })
      resolve(routes)
    })
  })
}

module.exports = Object.assign({}, {discoverRoutes})
