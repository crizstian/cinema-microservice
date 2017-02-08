const { createContainer, asValue } = require('awilix')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')

function initDI ({serverSettings, models, smtpSettings}, mediator) {
  mediator.once('init', () => {
    const container = createContainer()

    container.register({
      validate: asValue(models.validate),
      serverSettings: asValue(serverSettings),
      smtpSettings: asValue(smtpSettings),
      nodemailer: asValue(nodemailer),
      smtpTransport: asValue(smtpTransport)
    })

    mediator.emit('di.ready', container)
  })
}

module.exports.initDI = initDI
