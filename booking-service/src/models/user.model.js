const userSchema = (joi) => ({
  name: joi.string().regex(/^[a-zA-Z '-]+$/i).required(),
  lastName: joi.string().regex(/^[a-zA-Z '-]+$/i).required(),
  email: joi.string().email().required(),
  phoneNumber: joi.string().regex(/^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/),
  creditCard: joi.string().creditCard().required(),
  membership: joi.string().creditCard()
})

module.exports = userSchema
