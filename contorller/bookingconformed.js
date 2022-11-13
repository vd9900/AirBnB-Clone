
const { BookedroomDetails } = require("../Schemas/schema")



async function bookingconformedGET(req, res) {
  console.log(req.session.bookedRoom.roomDetails)
  // console.log(req.session.roomDetails)
  if (req.session.isAuth) {
    const newBookedroomDetails = await new BookedroomDetails({
      GuestName: req.session.bookedRoom.GuestName,
      whoBooked: req.session.email,
      CheckIn: req.session.bookedRoom.CheckIn,
      CheckOut: req.session.bookedRoom.CheckOut,
      Nop: req.session.bookedRoom.Nop,
      Non: req.session.bookedRoom.Non,
      Payment: req.session.bookedRoom.Payment,
      Price: req.session.bookedRoom.totalPrice,
      roomDetails: {
        propertyId: req.session.bookedRoom.roomDetails.propertyId,
        propertyName: req.session.bookedRoom.roomDetails.propertyName,
        mainTitle: req.session.bookedRoom.roomDetails.mainTitle,
        city: req.session.bookedRoom.roomDetails.city,
        country: req.session.bookedRoom.roomDetails.country,
        updated: req.session.bookedRoom.roomDetails.updated,
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
  }else{
    res.redirect("/login")
  }
}

module.exports = { bookingconformedGET }
