const { createContainer, asValue } = require('awilix')

function initDI ({serverSettings, dockerSettings}, mediator) {
  mediator.once('init', () => {
    const container = createContainer()

    container.register({
      dockerSettings: asValue(dockerSettings),
      serverSettings: asValue(serverSettings)
    })

    mediator.emit('di.ready', container)
  })
}

module.exports.initDI = initDI
