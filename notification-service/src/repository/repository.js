'use strict'
const repository = (container) => {
  const sendEmail = (payload) => {
    return new Promise((resolve, reject) => {
      const {smtpSettings, smtpTransport, nodemailer} = container.cradle

      const transporter = nodemailer.createTransport(
        smtpTransport({
          service: smtpSettings.service,
          auth: {
            user: smtpSettings.user,
            pass: smtpSettings.pass
          }
        }))

      const mailOptions = {
        from: '"Do Not Reply, Cinemas Company 👥" <no-replay@cinemas.com>',
        to: `${payload.user.email}`,
        subject: `Tickects for movie ${payload.booking.movie}`,
        html: `
            <h1>Tickest Email markup</h1>

            <h3>Cinemas Microserivce 2017</h3>
          `
      }

      transporter.sendMail(mailOptions, (err, info) => {
        if (error) {
          reject(new Error('An error occured sending an email, err:' + err))
        }
        transporter.close()
        resolve(1)
      })
    })
  }

  const sendSMS = (payload) => {
    // TODO: code for some sms service
  }

  return Object.create({
    sendSMS,
    sendEmail
  })
}

const connect = (container) => {
  return new Promise((resolve, reject) => {
    if (!container) {
      reject(new Error('dependencies not supplied!'))
    }
    resolve(repository(container))
  })
}

module.exports = Object.assign({}, {connect})
