/* eslint-env mocha */
const supertest = require('supertest')

describe('cinema-catalog-service', () => {
  const api = supertest('https://192.168.99.100:3000')
  it('returns schedules for a movie', (done) => {
    api.get('/cinemas/588ababf2d029a6d15d0b5bf/1')
      .expect(200, done)
  })
})
