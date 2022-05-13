
const notificationSchema = (joi) => ({
  city: joi.string(),
  userType: joi.string(),
  totalAmount: joi.number(),
  cinema: joi.object().keys({
    name: joi.string(),
    room: joi.number(),
    seats: joi.string()
  }),
  movie: joi.object().keys({
    title: joi.string(),
    format: joi.string(),
    schedule: joi.date()
  }),
  orderId: joi.string(),
  _id: joi.string(),
  description: joi.string(),
  user: joi.object().keys({
    name: joi.string(),
    email: joi.string().email()
  })
})

module.exports = notificationSchema
