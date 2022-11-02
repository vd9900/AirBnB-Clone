
// GET method
function logout(req, res) {
    req.session.destroy((err) => {
        if (err) {
            console.log(err);
            res.send("try again later")
        } else {
            res.redirect("/login")
        }
    })
}
module.exports = {logout}