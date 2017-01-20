'use strict'
const moviesMock = require('../mock/movies')

const repository = (db) => {

  const collection = db.collection('movies')

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
      const cursor = collection.find(query)
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

  const getMovieById = (id) => {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 }
      collection.findOne({id: id}, projection, (err, movie) => {
        if (err) {
          reject(new Error(`An error occured fetching movie with id: ${id}, err: ${err}`))
        }
        resolve(movie)
      })
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getMoviePremiers,
    getMovieById,
    disconnect
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
