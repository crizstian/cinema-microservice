const {dbSettings, serverSettings} = require('./config')
const database = require('./db')
const {initDI} = require('./di')
const models = require('../models')
const services = require('../services')

const init = initDI.bind(null, {serverSettings, dbSettings, database, models, services})

module.exports = Object.assign({}, {init})
