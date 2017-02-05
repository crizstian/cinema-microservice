const { createContainer, asValue, asFunction, asClass } = require('awilix')

function initDI ({serverSettings, dbSettings, database, models, services}, mediator) {
  mediator.once('init', () => {
    mediator.on('db.ready', (db) => {
      const container = createContainer()

      container.register({
        database: asFunction(db).singleton(),
        validate: asFunction(models.validate),
        booking: asFunction(models.booking),
        user: asFunction(models.booking),
        ticket: asFunction(models.booking),
        ObjectID: asClass(database.ObjectID),
        serverSettings: asValue(serverSettings),
        paymentService: asFunction(services.paymentService),
        notificationService: asFunction(services.notificationService)
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
