const express = require("express")
const bodyParser = require("body-parser")
const moongose = require("mongoose")
const path = require("path");
const { default: mongoose } = require("mongoose");
const app = express();
const appRouter = express.Router();

const { UserDetail } = require("./Schemas/schema")


// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use("/", appRouter)

mongoose.connect("mongodb://127.0.0.1/Users", { useNewUrlParser: true })
  .then(res => console.log("Sever connected to Database"))
  .catch(err => console.log(err))

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/index.html'));
});
app.get('/home', function (req, res) {
  res.sendFile(path.join(__dirname, '../views/home.html'));
});
// home page
// appRouter.route("/").get(homeGET) 

// // SignUp & Login page
// appRouter.route("/login").get(loginGET).post(loginPOST)
// appRouter.route("/signin").post(signinPOST)
app.post("/signin", (req, res) => {
  console.log(req.body)
  const NewUserDetail = new UserDetail({
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,
    userType: req.body.userType,
    gender: req.body.gender,
    address: {
      street: req.body.addressdetail,
      city: req.body.city,
      country: req.body.country
    }
  })
  // NewUserDetail.save((err, docs) => {
  //   if (err) {
  //     res.send("please try again later")
  //   } else {

  //   }
  // })
  res.redirect("/home")
})


//Hoster page
// appRouter.route("/hoster").get(productGET)
app.get("/hoster",(req,res)=>{
  res.sendFile(path.join(__dirname,"../views/hoster.html"))
})
app.post("/hoster",(req,res)=>{
  console.log(req.body.indoor);
  console.log(req.body.outdoor);
  console.log(req.body.essentials);
  res.send("Thank you for joining us, we wish you mar Ja")
})

//Product page
// appRouter.route("/product").get(productGET)
app.get("/product",(req,res)=>{
  res.sendFile(path.join(__dirname,"../views/product.html"))
})



//contact page
// appRouter.route("/contact").get(contactGET)

// Admin page
// appRouter.route("/Admin").get(adminGET)



function signinPOST(req, res) {
  res.send(req.body);
}
app.listen(4000)
