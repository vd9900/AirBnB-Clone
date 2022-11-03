const path = require('path')


async function  propertyGET(req, res) {
    if (req.session.isAuth) {
        // current clicked properity
        if (await req.session.clickedpro) {
            delete req.session.clickedpro
        }
        req.session.clickedpro = req.params.id

        console.log(req.params.id,"hlel");
        console.log(req.session.clickedpro,"bhai sab");
        res.sendFile(path.join(__dirname, "../views/product.html"))
    } else {
        res.redirect("/login")
    }
}
module.exports = { propertyGET }
