const path = require("path");

function mybookingsGET(req, res) {
    res.sendFile(path.join(__dirname, "../views/mybookings.html"))
}

module.exports = { mybookingsGET}