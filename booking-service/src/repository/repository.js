'use strict'
const repository = ({db, ObjectID} = {}) => {
  const makeBooking = (cinema) => {
    return new Promise((resolve, reject) => {
      db.collection('booking').insertOne(cinema, (err, result) => {
        if (err) {
          reject(new Error())
        }
        resolve(result)
      })
    })
  }

  const generateTicket = () => {
    return new Promise((resolve, reject) => {

    })
  }

  const getOrderById = (orderId) => {
    return new Promise((resolve, reject) => {
      const query = {_id: new ObjectID(orderId)}
      const response = (err, order) => {
        if (err) {
          reject(new Error('An error occuered retrieving a order, err: ' + err))
        }
        resolve(order)
      }
      db.collection('booking').findOne(query, {}, response)
    })
  }

  const disconnect = () => {
    db.close()
  }

  return Object.create({
    makeBooking,
    getOrderById,
    generateTicket,
    disconnect
  })
}

const connect = (container) => {
  return new Promise((resolve, reject) => {
    const connection = {
      db: container.resolve('database'),
      ObjectID: container.resolve('ObjectID')
    }
    if (!connection.db) {
      reject(new Error('connection db not supplied!'))
    }
    resolve(repository(connection))
  })
}

module.exports = Object.assign({}, {connect})
