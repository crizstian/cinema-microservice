/* eslint-env mocha */
const test = require('assert')
const {validate} = require('./')

console.log(Object.getPrototypeOf(validate))

describe('Schemas Validation', () => {
  it('can validate a notification object', (done) => {
    const notificationSchema = {
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

    validate(notificationSchema, 'notification')
      .then(value => {
        test.ok(value)
        console.log(value)
        done()
      })
      .catch(err => {
        console.log(err)
        done()
      })
  })
})
