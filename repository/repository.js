'use strict'
const moviesMock = require('../mock/movies')

const repository = (db) => {

  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      const movies = moviesMock.filter((movie) => movie.releaseYear === 2017)
      resolve(movies)
    })
  }

  return Object.create({
    getMoviePremiers
  })
}

module.exports.connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }

    resolve(repository(connection))
  })
}
