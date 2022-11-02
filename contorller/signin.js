
// post method
function signinPOST(req, res) {
  console.log(req.body)
  // hashing the password
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(req.body.password, salt)
  console.log(hash)
  const NewUserDetail = new UserDetail({
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    phone: req.body.phone,
    password: hash,
    userType: req.body.userType,
    gender: req.body.gender,
    address: {
      street: req.body.addressdetail,
      city: req.body.city,
      country: req.body.country
    }
  })
  NewUserDetail.save((err, docs) => {
    if (err) {
      console.log(err)
      res.send("please try again later")
    } else {
      res.redirect("/login")
    }

  })
}





module.exports = { signinPOST }
