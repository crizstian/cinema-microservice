const supertest = require('supertest')

module.exports = (payload) => {
  return new Promise((resolve, reject) => {
    supertest('http://192.168.99.100:8080')
      .post('/notification/sendEmail')
      .send({payload})
      .end((err, res) => {
        if (err) {
          reject(new Error('An error occured with the payment service, err: ' + err))
        }
        resolve(res.body)
      })
  })
}
