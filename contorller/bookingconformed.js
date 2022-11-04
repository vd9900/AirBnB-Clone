
const { BookedroomDetails } = require("../Schemas/schema")



function bookingconformedGET(req, res) {
  console.log(req.session)
  console.log(req.session)
  console.log(req.session)
  const newBookedroomDetails = new BookedroomDetails({
    GuestName: req.session.bookedRoom.GuestName,
    whoBooked: req.session.email,
    CheckIn: req.session.bookedRoom.CheckIn,
    CheckOut: req.session.bookedRoom.CheckOut,
    Nop: req.session.bookedRoom.Nop,
    Non: req.session.bookedRoom.Non,
    Payment: req.session.bookedRoom.Payment,
    roomDetails: {
      propertyId: req.session.clickedpro,
      propertyName: req.session.bookedRoom.propertyName,
      city: req.session.bookedRoom.city,
      country: req.session.bookedRoom.country,
      updated: req.session.bookedRoom.updated,
    }
  }).save(
    (err) => {
      if (!err) {
        res.send(`<h3>Awesome... your rocked🤩 booking conformed <br> <a href="http://localhost:4000/mybookings">Go to my booking</a></h3>`)
      } else {
        res.send(`<h3>Something went wrong Try again later <br> <a href="http://localhost:4000/home">Go to home page</a></h3>`)
      }
    }
  )
}

module.exports = { bookingconformedGET }
