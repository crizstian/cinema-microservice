/* eslint-env mocha */
const Docker = require('dockerode')
const fs = require('fs')
const {dockerSettings} = require('../config/config')

describe('Docker Connection', () => {
  it('should connect with docker', (done) => {
    const docker = new Docker(dockerSettings)

    docker.info(function (err, info) {
      console.log(info)

      done()
    })
  })
})
