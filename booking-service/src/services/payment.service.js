const supertest = require('supertest')

module.exports = (paymentOrder) => {
  return new Promise((resolve, reject) => {
    supertest('http://192.168.99.100:3003')
      .post('/payment/makePurchase')
      .send({paymentOrder})
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured with the payment service, err: ' + err))
        }
        resolve(res.body.paid)
      })
  })
}
