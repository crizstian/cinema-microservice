module.exports = (paymentOrder) => {
  return new Promise((resolve, reject) => {
    // supertest('url to the payment service')
    //   .get('/makePurchase')
    //   .send({paymentOrder})
    //   .end((err, res) => {
    //     if (err) {
    //       reject(new Error('An error occured with the payment service, err: ' + err))
    //     }
    //     resolve(res.body.payment)
    //   })
    resolve({orderId: Math.floor((Math.random() * 1000) + 1)})
  })
}
