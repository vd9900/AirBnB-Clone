const path = require("path");

function bookingconfGET(req, res) {
    if(req.session.isAuth){

        res.sendFile(path.join(__dirname, "../views/bookingconf.html"))
    }else{
        res.redirect("/login")
    }
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