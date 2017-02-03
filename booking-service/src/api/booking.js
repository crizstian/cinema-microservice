'use strict'
const status = require('http-status')

module.exports = (app, options) => {
  const {repo, schemaValidator} = options

  app.post('/booking', (req, res, next) => {
    Promise.all([
      schemaValidator().validate(req.user, 'user'),
      schemaValidator().validate(req.booking, 'booking')
    ])
    .then(([user, booking]) => {
      repo.makeStuff()
    })
    .catch(next)
  })

  app.get('/booking/verify/:orderId', (req, res, next) => {
    repo.verifyOrder(req.params.orderId)
      .then(value => {
        console.log(value)
      })
      .catch(next)
  })
}
