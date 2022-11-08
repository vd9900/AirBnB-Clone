const path = require("path");
const express = require("express")
const Router = express.Router();
const { BookedroomDetails, ReviewDetails } = require("../Schemas/schema")


Router.post("/", async (req, res) => {
    const id = req.session.clickedbookedroomId
    const result = await BookedroomDetails.findOne({ _id: id }, {});
    console.log(result.roomDetails.propertyId);
    const NewreviewDetail = new ReviewDetails({
      userName: req.session.username,
      propertyId: result.roomDetails.propertyId,
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