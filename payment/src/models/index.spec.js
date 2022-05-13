/* eslint-env mocha */
const test = require('assert')
const {validate} = require('./')

console.log(Object.getPrototypeOf(validate))

describe('Schemas Validation', () => {
  it('can validate a user object', (done) => {
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

    validate(testPayment, 'payment')
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
