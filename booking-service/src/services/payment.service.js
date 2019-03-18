const supertest = require('supertest')
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
process.env.NODE_TLS_ACCEPT_UNTRUSTED_CERTIFICATES_THIS_IS_INSECURE = '1'

module.exports = (paymentOrder) => {
  return new Promise((resolve, reject) => {
    supertest(`http://${process.env.PAYMENT_SERVICE}`)
      .post("/payment/makePurchase")
      .send({ paymentOrder })
      .end((err, res) => {
        if (err) {
          reject(
            new Error(
              "An error occured with the payment service, err: " + err
            )
          );
        }

        resolve(res.body.paid);
      });
  })
}
