// function singinPOST(req, res) {
//    console.log(req.body)
//   const NewUserDetail = new UserDetail({
//     name: req.body.name,
//     userId: req.body.userId,
//     email: req.body.email,
//     phone: req.body.phone,
//     password: req.body.password,
//     userType: req.body.userType,
//     gender: req.body.gender,
//     address: {
//       street: req.body.addressdetail,
//       city: req.body.city,
//       country: req.body.country
//     }
//   })
//   console.log(Date.parse(req.body.dob));
//   NewUserDetail.save((err, docs) => {
//     if (err) {
//       res.send("please try again later")
//     } else {

//       res.redirect("/home")
//     }
//   })
// }



// module.exports = { singinPOST }

const calculator = {
  read(a, b) {
    this.a = a,
      this.b = b
  },
  sum() {
    return this.a + this.b
  },
  mult() {
    return this.a * this.b
  }
}

// calculator.read(10,10);
// console.log(calculator.sum())
// console.log(calculator.mult())


const obj = {
  name: "vd",
   method () {
    return {
      newk ( ){
        console.log(this);
      }
    }

  }  
}
obj.method()