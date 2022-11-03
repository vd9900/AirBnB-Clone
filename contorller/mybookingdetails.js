const path = require("path");


function mybookingsdetailsGET(req, res) {
    req.session.bookedroomId = req.params.id
    res.sendFile(path.join(__dirname, "../views/bookingdeatils.html"))
}
module.exports = { mybookingsdetailsGET }