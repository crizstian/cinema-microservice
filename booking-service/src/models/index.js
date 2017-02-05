const joi = require('joi')
const user = require('./user.model')(joi)
const booking = require('./booking.model')(joi)
const ticket = require('./ticket.model')(joi)

const schemas = Object.create({user, booking, ticket})

const schemaValidator = (object, type) => {
  return new Promise((resolve, reject) => {
    if (!object) {
      reject(new Error('object to validate not provided'))
    }
    if (!type) {
      reject(new Error('schema type to validate not provided'))
    }

    const {error, value} = joi.validate(object, schemas[type])

    if (error) {
      reject(new Error(`invalid ${type} data, err: ${error}`))
    }
    resolve(value)
  })
}

module.exports = Object.create({validate: schemaValidator, schemas})
