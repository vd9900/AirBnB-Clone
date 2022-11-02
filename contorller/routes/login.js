
// GET Method
function loginGET(req, res) {
    if (req.session.isAuth) {
        res.redirect("/home")
    } else {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    }
}

// POST Method

async function loginPOST(req, res) {
    console.log(req.body)
    const result = await UserDetail.findOne({ email: req.body.email }, {})

    if (result) {
        const match = await bcrypt.compare(req.body.password, result.password)
        if (match) {
            //adding session
            req.session.isAuth = true;
            req.session.username = result.name;
            req.session.email = result.email;
            req.session.save()
            res.redirect("/home")
        } else {
            res.send(`wrong password try again <a href="http://localhost:4000/login">login</a>`)
        }
    } else {

        res.send(`User not founded! try again <a href="http://localhost:4000/login">login</a>`)
    }
}

module.exports = { loginGET, loginPOST }
