const paymentSchema = (joi) => ({
  userName: joi.string(),
  currency: joi.string(),
  number: joi.string().creditCard(),
  cvc: joi.number(),
  exp_month: joi.number(),
  exp_year: joi.number(),
  amount: joi.number(),
  description: joi.string()
})

module.exports = paymentSchema
