/* eslint-env mocha */
const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

describe('Booking Service', () => {
  const api = supertest(
    "https://aero-cluster-nlb-326dfedca9b7e0c0.elb.us-west-1.amazonaws.com/booking-api"
  );
  const now = new Date()
  now.setDate(now.getDate() + 1)
  const user = {
    name: 'Cristian',
    lastName: 'Ramirez',
    email: 'cristiano@gmail.com',
    creditCard: {
      number: '4242424242424242',
      cvc: '123',
      exp_month: '12',
      exp_year: '2019',
    },
    membership: '7777888899990000'
  }

  const booking = {
    city: 'Morelia',
    cinema: 'Plaza Morelia',
    movie: {
      title: 'Assasins Creed',
      format: 'IMAX'
    },
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
