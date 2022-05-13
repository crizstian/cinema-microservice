const bookingSchema = (joi) => ({
  city: joi.string(),
  cinema: joi.string(),
  schedule: joi.date().min('now'),
  movie: joi.object().keys({
    title: joi.string(),
    format: joi.string()
  }),
  cinemaRoom: joi.number(),
  seats: joi.array().items(joi.string()).single(),
  totalAmount: joi.number()
})

module.exports = bookingSchema
