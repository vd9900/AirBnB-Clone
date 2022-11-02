const path = require("path");

// GET method
function logoutGET(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send("try again later")
        } else {
            res.redirect("/login")
        }
    })
}
module.exports = {logoutGET}