function propertyGET(req, res) {
    if (req.session.isAuth) {
        // current clicked properity
        if (req.session.clickedpro) {
            delete req.session.clickedpro
        }
        req.session.clickedpro = req.params.id

        console.log(req.params.id);
        res.sendFile(path.join(__dirname, "../views/product.html"))
    } else {
        res.redirect("/login")
    }
}
module.exports = { propertyGET }
