/* eslint-env mocha */
const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

describe('cinema-catalog-service', () => {
  const api = supertest('https://192.168.99.100:3003')
  const payload = {
    city: 'Morelia',
    userType: 'loyal',
    totalAmount: 71,
    cinema: {
      name: 'Plaza Morelia',
      room: '1',
      seats: '53, 54'
    },
    movie: {
      title: 'Assasins Creed',
      format: 'IMAX',
      schedule: new Date()
    },
    orderId: '1aa90cx',
    description: 'some description',
    user: {
      name: 'Cristian Ramirez',
      email: 'cristiano.rosetti@gmail.com'
    }
  }

  it('can make a booking', (done) => {
    api.post('/sendEmail')
      .send({payload})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
