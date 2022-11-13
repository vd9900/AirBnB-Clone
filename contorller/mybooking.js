const path = require("path");

function mybookingsGET(req, res) {
    if(req.session.isAuth){
        res.sendFile(path.join(__dirname, "../views/mybookings.html"))
    }else{
        res.redirect("/login")
    }
}

module.exports = { mybookingsGET}