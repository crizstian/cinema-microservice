'use strict'
const status = require('http-status')

module.exports = ({repo}, app) => {
  app.post('/makePurchase', (req, res, next) => {
    const {validate} = req.container.cradle

    validate(req.body.paymentOrder, 'payment')
      .then(payment => {
        repo.registerPayment(payment)
      })
      .then(paid => {
        res.status(status.OK).json({paid})
      })
      .catch(next)
  })

  app.get('/getPurchaseById/:id', (req, res, next) => {
    repo.getPurchaseById(req.params.id)
      .then(payment => {
        res.status(status.OK).json({payment})
      })
      .catch(next)
  })
}
