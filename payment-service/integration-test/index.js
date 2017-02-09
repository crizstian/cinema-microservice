/* eslint-env mocha */
const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

describe('cinema-catalog-service', () => {
  const api = supertest('https://192.168.99.100:3002')
  const testPayment = {
    userName: 'Cristian Ramirez',
    currency: 'mxn',
    number: '4242424242424242',
    cvc: '123',
    exp_month: '12',
    exp_year: '2017',
    amount: 71,
    description: `
      Tickect(s) for movie "Assasins Creed",
      with seat(s) 47, 48
      at time 8 / feb / 17`
  }

  it('can make a booking', (done) => {
    api.post('/makePurchase')
      .send({paymentOrder: testPayment})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
