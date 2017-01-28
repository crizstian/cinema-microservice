'use strict'
const ObjectID = require('mongodb').ObjectID
const http = require('supertest')
const {uris} = require('../config')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const repository = (db) => {
  const getCinemasByCity = (cityId) => {
    return new Promise((resolve, reject) => {
      const cinemas = []
      const cursor = db.collection('cinemas').find({city_id: cityId}, {_id: 1, name: 1})
      const addCinema = (cinema) => {
        cinemas.push(cinema)
      }
      const sendCinemas = (err) => {
        if (err) {
          reject(new Error('An error occured fetching cinemas, err: ' + err))
        }
        resolve(cinemas)
      }
      cursor.forEach(addCinema, sendCinemas)
    })
  }

  const getCinemaById = (cityId, cinemaId) => {
    return new Promise((resolve, reject) => {
      const query = {_id: new ObjectID(cinemaId), city_id: cityId}
      const projection = {title: 1, id: 1}
      const sendCinema = (cinema, premieres) => {
        // check for the cinema premieres
      }
      const response = (err, cinema) => {
        if (err) {
          reject(new Error('An error occuered retrieving a cinema, err: ' + err))
        }
        getCinemaPremieres()
          .then(movies => sendCinema(cinema, movies))
          .catch(err => reject(err))
      }
      db.collection('cinemas').findOne(query, projection, response)
    })
  }

  const getCinemaPremieres = () => {
    return new Promise((resolve, reject) => {
      http(uris.movieServiceUrl)
        .get('/movies/premieres')
        .end((err, res) => {
          if (err) {
            reject(new Error('An error occured fetching movie premieres: err' + err))
          }
          resolve(res.body)
        })
    })
  }

  const getCinemaScheduleByMovie = () => {
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
      const addMovie = (movie) => {
        movies.push(movie)
      }
      const sendMovies = (err) => {
        if (err) {
          reject(new Error('An error occured fetching all movies, err:' + err))
        }
        resolve(movies)
      }
      cursor.forEach(addMovie, sendMovies)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    getCinemasByCity,
    getCinemaById,
    getCinemaScheduleByMovie,
    disconnect
  })
}

const connect = (connection) => {
  return new Promise((resolve, reject) => {
    if (!connection) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
