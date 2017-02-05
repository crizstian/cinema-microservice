const {ObjectID} = require('mongodb')
const {connect} = require('./mongo')

module.exports = Object.assign({}, {connect, ObjectID})
