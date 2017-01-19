const should = require('should')
const repository = require('./repository')

describe('Repository', () => {

  it('should connect with a promise', () => {
    repository.connect({}).should.be.a.Promise()
  })

  it('should return movie collection', () => {
    repository.connect({})
      .then(repo => {
        return repo.getMoviePremiers()
      })
      .then(movies => {
        movies.should.be.a.Array()
      })
  })

})
