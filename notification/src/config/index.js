const {smtpSettings, serverSettings} = require('./config')
const {initDI} = require('./di')
const models = require('../models')

const init = initDI.bind(null, {serverSettings, smtpSettings, models})

module.exports = Object.assign({}, {init})
