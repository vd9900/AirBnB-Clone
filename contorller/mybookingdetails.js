const path = require("path");


function mybookingsdetailsGET(req, res) {
    req.session.clickedbookedroomId = req.query.id

    res.sendFile(path.join(__dirname, "../views/bookingdeatils.html"))
}
module.exports = { mybookingsdetailsGET }