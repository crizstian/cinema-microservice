'use strict'
const status = require('http-status')

module.exports = ({repo}, app) => {
  app.post('/booking', (req, res, next) => {
    const validate = req.container.cradle.validate
    const paymentService = req.container.resolve('paymentService')
    const notificationService = req.container.resolve('notificationService')

    Promise.all([
      validate(req.body.user, 'user'),
      validate(req.body.booking, 'booking')
    ])
    .then(([user, booking]) => {
      const payment = {
        userName: user.name + ' ' + user.lastName,
        currency: 'mxn',
        number: user.creditCard.number,
        cvc: user.creditCard.cvc,
        exp_month: user.creditCard.exp_month,
        exp_year: user.creditCard.exp_year,
        amount: booking.totalAmount,
        description: `
          Tickect(s) for movie ${booking.movie},
          with seat(s) ${booking.seats.toString()}
          at time ${booking.schedule}`
      }

      return Promise.all([
        paymentService(payment),
        Promise.resolve(user),
        Promise.resolve(booking)
      ])
    })
    .then(([paid, user, booking]) => {
      return Promise.all([
        repo.makeBooking(user, booking),
        Promise.resolve(paid),
        Promise.resolve(user)
      ])
    })
    .then(([booking, paid, user]) => {
      return Promise.all([
        repo.generateTicket(paid, booking),
        Promise.resolve(user)
      ])
    })
    .then(([ticket, user]) => {
      const payload = Object.assign({}, ticket, {user: {name: user.name + user.lastName, email: user.email}})
      notificationService(payload)
      res.status(status.OK).json(ticket)
    })
    .catch(next)
  })

  app.get('/booking/verify/:orderId', (req, res, next) => {
    repo.getOrderById(req.params.orderId)
      .then(order => {
        res.status(status.OK).json(order)
      })
      .catch(next)
  })
}
