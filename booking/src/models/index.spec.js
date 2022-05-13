/* eslint-env mocha */
const test = require('assert')
const {validate} = require('./')

console.log(Object.getPrototypeOf(validate))

describe('Schemas Validation', () => {
  it('can validate a booking object', (done) => {
    const now = new Date()
    now.setDate(now.getDate() + 1)

    const testBooking = {
      city: 'Morelia',
      cinema: 'Plaza Morelia',
      movie: 'Assasins Creed',
      schedule: now,
      cinemaRoom: 7,
      seats: ['45'],
      totalAmount: 71
    }

    validate(testBooking, 'booking')
      .then(value => {
        console.log('validated')
        console.log(value)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('can validate a user object', (done) => {
    const testUser = {
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

    validate(testUser, 'user')
      .then(value => {
        console.log('validated')
        console.log(value)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })

  it('can validate a ticket object', (done) => {
    const testTicket = {
      cinema: 'Plaza Morelia',
      schedule: new Date(),
      movie: 'Assasins Creed',
      seats: ['35'],
      cinemaRoom: 1,
      orderId: '34jh1231ll'
    }

    validate(testTicket, 'ticket')
      .then(value => {
        console.log('validated')
        console.log(value)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
