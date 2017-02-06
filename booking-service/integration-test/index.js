/* eslint-env mocha */
const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

describe('cinema-catalog-service', () => {
  const api = supertest('https://192.168.99.100:3001')
  const now = new Date()
  now.setDate(now.getDate() + 1)
  const user = {
    name: 'Cristian',
    lastName: 'Ramirez',
    email: 'cristiano@nupp.com',
    creditCard: {
      number: '1111222233334444',
      cvc: '123',
      exp_month: '07',
      exp_year: '2017'
    },
    membership: '7777888899990000'
  }

  const booking = {
    city: 'Morelia',
    cinema: 'Plaza Morelia',
    movie: 'Assasins Creed',
    schedule: now.toString(),
    cinemaRoom: 7,
    seats: ['45'],
    totalAmount: 71
  }

  it('can make a booking', (done) => {
    api.post('/booking')
      .send({user, booking})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
