const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require('./ssl')
}

const smtpSettings = {
  service: 'Gmail',
  user: 'cristiano.rosetti@gmail.com',
  pass: 'Cris123@#'
}

module.exports = Object.assign({}, { serverSettings, smtpSettings })
