/* eslint-env mocha */
const supertest = require('supertest')

describe('cinema-catalog-service', () => {
  const api = supertest('https://localhost:8080')

  it('returns a 200 for a known movies through api-gateway', (done) => {
    api.get('/movies/premieres')
      .expect(200, done)
  })

  it('returns schedules for a movie through api-gateway', (done) => {
    api.get('/cinemas/588ababf2d029a6d15d0b5bf/1')
      .expect(200, done)
  })

  it('can make a booking through api-gateway', (done) => {
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

    api.post('/booking')
      .send({user, booking})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })

  it('can make a paymentOrder through api-gateway', (done) => {
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
    api.post('/payment/makePurchase')
      .send({paymentOrder: testPayment})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })

  it('can send a notification through api-gateway', (done) => {
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
    api.post('/notification/sendEmail')
      .send({payload})
      .expect((res) => {
        console.log(res.body)
      })
      .expect(200, done)
  })
})
