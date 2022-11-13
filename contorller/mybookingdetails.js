const path = require("path");


function mybookingsdetailsGET(req, res) {
    if(req.session.isAuth){
        req.session.clickedbookedroomId = req.query.id
    }else{
        res.redirect("/login")
    }

    res.sendFile(path.join(__dirname, "../views/bookingdeatils.html"))
}
module.exports = { mybookingsdetailsGET }