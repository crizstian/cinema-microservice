/* eslint-env mocha */
const should = require('should')
const repository = require('./repository')

describe('Repository', () => {
  it('should connect with a promise', (done) => {
    repository.connect({}).should.be.a.Promise()
    done()
  })
})
