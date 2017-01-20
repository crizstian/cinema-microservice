'use strict'
const moviesMock = require('../mock/movies')

const repository = (db) => {

  const getMoviePremiers = () => {
    return new Promise((resolve, reject) => {
      const movies = []
      const currentDay = new Date()
      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear()
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2
        },
        releaseDay: {
          $lte: currentDay.getDate()
        }
      }
      console.log(query)
      const cursor = db.collection('movies').find(query)
      cursor.forEach((movie) => {
        movies.push(movie)
      }, (err) => {
        if (err) {
          reject(new Error('An error occured retrieveing movie premiers, err: ' + err))
        }
        resolve(movies)
      })
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
