/* eslint-env mocha */
const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

describe('movies-service', () => {
  const api = supertest('http://192.168.99.100:300')
  it('returns a 200 for a known user', (done) => {
    api.get('/movies/premieres')
      .expect(200, done)
  })
})
