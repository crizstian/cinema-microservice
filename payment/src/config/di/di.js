const { createContainer, asValue } = require('awilix')
const stripe = require('stripe')

function initDI ({serverSettings, dbSettings, database, models, stripeSettings}, mediator) {
  mediator.once('init', () => {
    mediator.on('db.ready', (db) => {
      const container = createContainer()

      container.register({
        database: asValue(db),
        validate: asValue(models.validate),
        ObjectID: asValue(database.ObjectID),
        serverSettings: asValue(serverSettings),
        stripe: asValue(stripe(stripeSettings.secret))
      })

      mediator.emit('di.ready', container)
    })

    mediator.on('db.error', (err) => {
      mediator.emit('di.error', err)
    })

    database.connect(dbSettings, mediator)

    mediator.emit('boot.ready')
  })
}

module.exports.initDI = initDI
