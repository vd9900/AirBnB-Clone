const path = require("path");

function bookingconfGET(req, res) {
    res.sendFile(path.join(__dirname, "../views/bookingconf.html"))
}
function bookingconfPOST(req, res) {
    console.log(req.body);
    if (req.session.bookedRoom) {
        delete req.session.bookedRoom;
    }
    req.session.bookedRoom = req.body

    res.sendFile(path.join(__dirname, "../views/bookingconf.html"))
}

module.exports = { bookingconfGET, bookingconfPOST }