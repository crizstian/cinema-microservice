const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

const start = (options) => {
  return new Promise((resolve, reject) => {
    if (!options.repo) {
      throw new Error('The server must be started with a connected repository')
    }
    if (!options.port) {
      throw new Error('The server must be started with an available port')
    }
    const app = express()
    app.use(morgan('dev'))
    app.use(helmet())
    app.use((err, req, res, next) => {
      throw new Error('Something went wrong!, err:' + err)
      res.status(500).send('Something went wrong!')
    })

    require('../api/movies')(app, options)

    const server = app.listen(options.port, () => resolve(server))
  })
}

module.exports.start = start
