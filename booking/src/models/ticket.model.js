
const ticketSchema = (joi) => ({
  cinema: joi.string(),
  schedule: joi.date(),
  movie: joi.string(),
  seats: joi.array().items(joi.string()).single(),
  cinemaRoom: joi.number(),
  orderId: joi.string().alphanum()
})

module.exports = ticketSchema
