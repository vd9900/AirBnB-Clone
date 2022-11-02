
const path = require("path");


function homeGET(req, res) {
    if (req.session.isAuth) {
        res.sendFile(path.join(__dirname, '../views/home.html'));
        // console.log(req.session.isAuth);
        // console.log(req.session.username);
        // console.log(req.session.email);
    } else {
        res.redirect("/login")
    }
}

module.exports = { homeGET }