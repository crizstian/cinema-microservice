/* eslint-env mocha */
const request = require('supertest')
const server = require('../server/server')

describe('Movies API', () => {
  let app = null
  let testMovies = [{
    'id': '3',
    'title': 'xXx: Reactivado',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 20
  }, {
    'id': '4',
    'title': 'Resident Evil: Capitulo Final',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 27
  }, {
    'id': '1',
    'title': 'Assasins Creed',
    'format': 'IMAX',
    'releaseYear': 2017,
    'releaseMonth': 1,
    'releaseDay': 6
  }]

  let testRepo = {
    getAllMovies () {
      return Promise.resolve(testMovies)
    },
    getMoviePremiers () {
      return Promise.resolve(testMovies.filter(movie => movie.releaseYear === 2017))
    },
    getMovieById (id) {
      return Promise.resolve(testMovies.find(movie => movie.id === id))
    }
  }

  beforeEach(() => {
    return server.start({
      port: 3000,
      repo: testRepo
    }).then(serv => {
      app = serv
    })
  })

  afterEach(() => {
    app.close()
    app = null
  })

  it('can return all movies', (done) => {
    request(app)
      .get('/movies')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'format': 'IMAX',
          'releaseYear': 2017,
          'releaseMonth': 1,
          'releaseDay': 6
        })
      })
      .expect(200, done)
  })

  it('can get movie premiers', (done) => {
    request(app)
    .get('/movies/premieres')
    .expect((res) => {
      res.body.should.containEql({
        'id': '1',
        'title': 'Assasins Creed',
        'format': 'IMAX',
        'releaseYear': 2017,
        'releaseMonth': 1,
        'releaseDay': 6
      })
    })
    .expect(200, done)
  })

  it('returns 200 for an known movie', (done) => {
    request(app)
      .get('/movies/1')
      .expect((res) => {
        res.body.should.containEql({
          'id': '1',
          'title': 'Assasins Creed',
          'format': 'IMAX',
          'releaseYear': 2017,
          'releaseMonth': 1,
          'releaseDay': 6
        })
      })
      .expect(200, done)
  })
})
