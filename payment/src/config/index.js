const {dbSettings, serverSettings, stripeSettings} = require('./config')
const database = require('./db')
const {initDI} = require('./di')
const models = require('../models')

const init = initDI.bind(null, {serverSettings, dbSettings, database, models, stripeSettings})

module.exports = Object.assign({}, {init})
