'use strict'
const status = require('http-status')

module.exports = ({repo}, app) => {
  const {validate} = req.container.cradle

  app.post('/sendEmail', (req, res, next) => {
    repo.sendEmail(req.params.payload)
      .then(order => {
        res.status(status.OK).json({msg: 'ok'})
      })
      .catch(next)
  })

  app.post('/sendSMS', (req, res, next) => {
    repo.sendSMS(req.params.payload)
      .then(order => {
        res.status(status.OK).json({msg: 'ok'})
      })
      .catch(next)
  })
}
