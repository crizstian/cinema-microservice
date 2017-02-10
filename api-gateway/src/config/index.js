const {dockerSettings, serverSettings} = require('./config')
const {initDI} = require('./di')
const init = initDI.bind(null, {serverSettings, dockerSettings})

module.exports = Object.assign({}, {init})
