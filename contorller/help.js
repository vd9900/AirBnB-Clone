const path = require("path");


function helpGET(req, res) {
    res.sendFile(path.join(__dirname, "../views/help.html"))
}

module.exports = { helpGET }