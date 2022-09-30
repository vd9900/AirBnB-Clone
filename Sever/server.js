const express = require("express")
const bodyParser = require("body-parser")
const moongose = require("mongoose")
const path = require("path");
const bcrypt = require("bcrypt")
var session = require('express-session')
const { default: mongoose } = require("mongoose");
const app = express();
const appRouter = express.Router();

const { UserDetail,HostedRoomDetails } = require("./Schemas/schema")

//session
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: '1234676890dsafs',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use("/", appRouter)

mongoose.connect("mongodb://127.0.0.1/Users", { useNewUrlParser: true })
  .then(res => console.log("Sever connected to Database"))
  .catch(err => console.log(err))

app.get('/login', function (req, res) {
  if(req.session.isAuth){
    res.redirect("/home")
  }else{
    res.sendFile(path.join(__dirname, '../views/index.html'));
  }
})
app.post("/login", async (req, res) => {
  console.log(req.body)
  const result = await UserDetail.findOne({ email: req.body.email }, {})
  
  if (result) {
    const match = await bcrypt.compare(req.body.password, result.password)
    if (match) {
      //adding session
      req.session.isAuth = true;
      req.session.save()
      res.redirect("/home")
    } else {
      res.send(`wrong password try again <a href="http://localhost:4000/login">login</a>`)
    }
  } else {
    
    res.send(`User not founded! try again <a href="http://localhost:4000/login">login</a>`)
  }
  
  
  
  
})
const lll = {
  name:"vinith",
  
}
app.get('/home', function (req, res) {
if(req.session.isAuth){
  res.sendFile(path.join(__dirname, '../views/home.html'));
}else{
 res.redirect("/login")
}
});
// home page
// appRouter.route("/").get(homeGET) 

// // SignUp & Login page
// appRouter.route("/login").get(loginGET).post(loginPOST)




// appRouter.route("/signin").post(signinPOST)
app.post("/signin", (req, res) => {
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
})

// logout page
app.get("/logout",(req,res)=>{
  req.session.destroy((err)=>{
    if(err){
      console.log(err);
      res.send("try again later")
    }else{
      res.redirect("/login")
    }
  })
})


//Hoster page
// appRouter.route("/hoster").get(productGET)
app.get("/hoster", (req, res) => {
  console.log(req.session.isAuth)
  if(req.session.isAuth){
    res.sendFile(path.join(__dirname, "../views/hoster.html"))
  }else{
   res.redirect("/login")
  }
  console.log(req.session.isAuth)
})
app.post("/hoster", (req, res) => {
  console.log(req.body.indoor);
  console.log(req.body.outdoor);
  console.log(req.body.essentials);
const newHostedRoomDetails =  new HostedRoomDetails({
})
  res.send(`User not founded! try again <a href="http://localhost:4000/home">back to home</a>`)
})

//Product page
// appRouter.route("/product").get(productGET)
app.get("/product", (req, res) => {
  if(req.session.isAuth){
    res.sendFile(path.join(__dirname, "../views/product.html"))
  }else{
   res.redirect("/login")
   }
})



//contact page
// appRouter.route("/contact").get(contactGET)

// Admin page
// appRouter.route("/Admin").get(adminGET)

// fecthing data to front-end
app.get("/fetch",(req,res)=>{
  
})



function signinPOST(req, res) {
  res.send(req.body);
}
app.listen(4000)
