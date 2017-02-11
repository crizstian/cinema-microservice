'use strict'
const status = require('http-status')

module.exports = ({repo}, app) => {
  app.post('/payment/makePurchase', (req, res, next) => {
    const {validate} = req.container.cradle

    validate(req.body.paymentOrder, 'payment')
      .then(payment => {
        return repo.registerPurchase(payment)
      })
      .then(paid => {
        res.status(status.OK).json({paid})
      })
      .catch(next)
  })

  app.get('/payment/getPurchaseById/:id', (req, res, next) => {
    repo.getPurchaseById(req.params.id)
      .then(payment => {
        res.status(status.OK).json({payment})
      })
      .catch(next)
  })
}
