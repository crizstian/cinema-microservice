const serverSettings = {
  port: process.env.PORT || 3000,
  ssl: require('./ssl')
}

// as a better practice we can pass this values via env variables
const smtpSettings = {
  service: 'Gmail',
  user: 'your-email@gmail.com',
  pass: 'your email password'
}

module.exports = Object.assign({}, { serverSettings, smtpSettings })
