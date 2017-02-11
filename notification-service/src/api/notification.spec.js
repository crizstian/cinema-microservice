/* eslint-env mocha */
const { createContainer, asValue } = require('awilix')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const should = require('should')
const request = require('supertest')
const server = require('../server/server')
const models = require('../models')
const {smtpSettings} = require('../config/config')

describe('Booking API', () => {
  let app = null

  const serverSettings = {
    port: 3000
  }

  const container = createContainer()

  container.register({
    validate: asValue(models.validate),
    serverSettings: asValue(serverSettings),
    smtpSettings: asValue(smtpSettings),
    nodemailer: asValue(nodemailer),
    smtpTransport: asValue(smtpTransport)
  })

  let _testRepo = {
    sendEmail ({container}, payload) {
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
          subject: `Tickects for movie ${payload.movie.title}`,
          html: `
              <h1>Tickest for ${payload.movie.title}</h1>

              <h3>Cinema: <span>${payload.cinema.name}</span> </h3>
              <h4>Room: <span>${payload.cinema.room}</span> </h4>
              <h4>Seat(s): <span>${payload.cinema.seats}</span> </h4>

              <h4>description: <span>${payload.description}</span> </h4>

              <h4>Total: <span>${payload.totalAmount}</span> </h4>
              <h4>number of order: <span>${payload.orderId}</span> </h4>

              <h3>Cinemas Microserivce 2017, Enjoy your movie 🍿🎥!</h3>
            `
        }

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            reject(new Error('An error occured sending an email, err:' + err))
          }
          transporter.close()
          resolve(info)
        })
      })
    }
  }

  const testRepo = {}

  testRepo.sendEmail = _testRepo.sendEmail.bind(null, {container})

  container.registerValue({repo: testRepo})

  beforeEach(() => {
    return server.start(container)
      .then(serv => {
        app = serv
      })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can make a booking and return the ticket(s)', (done) => {
    const payload = {
      city: 'Morelia',
      userType: 'loyal',
      totalAmount: 71,
      cinema: {
        name: 'Plaza Morelia',
        room: '1',
        seats: '53, 54'
      },
      movie: {
        title: 'Assasins Creed',
        format: 'IMAX',
        schedule: new Date()
      },
      orderId: '1aa90cx',
      description: 'some description',
      user: {
        name: 'Cristian Ramirez',
        email: 'cristiano.rosetti@gmail.com'
      }
    }

    request(app)
      .post('/notification/sendEmail')
      .send({payload})
      .expect((res) => {
        should.ok(res.body)
      })
      .expect(200, done)
  })
})
