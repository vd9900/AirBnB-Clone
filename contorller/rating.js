const path = require("path");
const express = require("express")
const Router = express.Router();
const { BookedroomDetails, ReviewDetails } = require("../Schemas/schema");
const { clearScreenDown } = require("readline");


Router.post("/", async (req, res) => {
  const id = req.session.clickedbookedroomId
  const result = await BookedroomDetails.findOne({ _id: id }, {});
  const reviewArray = await ReviewDetails.find({ propertyId: result.roomDetails.propertyId }, {});
  console.log(reviewArray.length);
  const totalRating = (reviewArray.length !== 0 ? Number(reviewArray[reviewArray.length - 1].totalrating) + Number(req.body.rating) : 0 + req.body.rating)
  console.log(totalRating)
  const NewreviewDetail = new ReviewDetails({
    userName: req.session.username,
    propertyId: result.roomDetails.propertyId,
    rating: req.body.rating,
    totalrating: totalRating,
    Description: req.body.describe
  }).save((err) => {
    if (err) {
      res.send(`Something went Wrong try again😭 <a href="http://localhost:4000/home">back to home</a>`)
      console.log(err)
    } else {
      res.send(`<h3>Thanks for your review🥰</h3> <a href="http://localhost:4000/home">back to home</a>`)
    }

  })
})
module.exports = Router;