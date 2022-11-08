const path = require("path");
const express = require("express")
const Router = express.Router();

Router.get("/", function propertyGET(req, res) {
    if (req.session.isAuth) {
      req.session.clickedpro = req.query.id
      // console.log(req.cookies)
      res.sendFile(path.join(__dirname, "../views/product.html"))
    } else {
      res.redirect("/login")
    }
  
  })

module.exports = Router;
