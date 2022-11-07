const express = require("express")
const bodyParser = require("body-parser")
const moongose = require("mongoose")
const path = require("path");
const multer = require('multer');
var session = require('express-session')
var cookieParser = require('cookie-parser');
const { default: mongoose } = require("mongoose");
const app = express();
const appRouter = express.Router();

//session
app.set('trust proxy', 1) // trust first proxy)
app.use(session({
  secret: '1234676890dsafs',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }
}))

// Middlewares
app.use(bodyParser.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use("/", appRouter)


const { signinPOST } = require("./contorller/signin")
const { loginGET, loginPOST } = require("./contorller/login")
const { homeGET } = require("./contorller/home")
const { bookingconfGET, bookingconfPOST } = require("./contorller/bookingconf")
const { bookingconformedGET } = require("./contorller/bookingconformed")
const { mybookingsGET } = require("./contorller/mybooking")
const { mybookingsdetailsGET } = require("./contorller/mybookingdetails")
const { helpGET } = require("./contorller/help")
const { logoutGET } = require("./contorller/logout")
const { UserDetail, HostedRoomDetails, BookedroomDetails, ReviewDetails } = require("./Schemas/schema")

const propertyRoute = require("./contorller/property")
const hosterRoute = require("./contorller/hoster");
const { nextTick } = require("process");

// image storing path
const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './views/assets');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.parse(file.originalname).name + path.extname(file.originalname));
  }
});

// multer docs
const gallery = multer({ storage: galleryStorage }).array('Gallery');

mongoose.connect("mongodb://127.0.0.1/Users", { useNewUrlParser: true })
  .then(res => console.log("Sever connected to Database"))
  .catch(err => console.log(err))


// Login page
appRouter.route("/login").get(loginGET).post(loginPOST)

// SignUp page
appRouter.route("/signin").post(signinPOST)

// logout page

appRouter.route("/logout").get(logoutGET)

// home page
appRouter.route("/home").get(homeGET)


//Hoster page

appRouter.use("/hoster", hosterRoute)

//Product page
appRouter.get("/property", function propertyGET(req, res) {
  if (req.session.isAuth) {
    req.session.clickedpro = req.query.id
    // console.log(req.cookies)
    res.sendFile(path.join(__dirname, "./views/product.html"))
  } else {
    res.redirect("/login")
  }

})

appRouter.get("/fetchproperty", async (req, res) => {
  const result = await HostedRoomDetails.findOne({ propertyId:req.session.clickedpro }, {})
  res.json(result)
})

// my booking conformation  page
appRouter.route("/property/bookingconf").get(bookingconfGET).post(bookingconfPOST)

// my booking conformed  page
appRouter.route("/conformed").get(bookingconformedGET)

// my booking  page
appRouter.route("/mybookings").get(mybookingsGET)

// my booking details  page
appRouter.route("/mybooking/:id").get(mybookingsdetailsGET)

// rating and reivews page

app.post("/rating", (req, res) => {
  console.log(req.body);
  const NewreviewDetail = new ReviewDetails({

  })

  res.send(`<h3>Thanks for your review🥰</h3>
  <br>
  <h4><a href="http://localhost:4000/home">Back to home</a></h4>`)
})

//contact page
appRouter.route("/help").get(helpGET)



// properity page showing to user

// fecthing data to front-end
app.get("/fetchproperties", async (req, res) => {
  const result = await HostedRoomDetails.find({}, {})
  res.json(result)

})

app.get("/fetchbookedRoom", async (req, res) => {
  console.log(req.session);
  const result = await HostedRoomDetails.findOne({ propertyId: req.session.clickedpro }, {})
  console.log(result);
  req.session.bookedRoom.roomDetails = {
    propertyName: result.propertyName,
    propertyId: req.session.clickedpro,
    mainTitle: result.mainTitle,
    city: result.address.city,
    country: result.address.country,
    updated: result.updated,
  },

    // calculating the total
    req.session.bookedRoom.totalPrice = result.price * req.session.bookedRoom.Non


  console.log(req.session.bookedRoom);
  res.send(req.session.bookedRoom)
})
//  creating api for my booking properties
//  creating api for my booking properties
//  creating api for my booking properties
//  creating api for my booking properties
//  creating api for my booking properties

app.get("/fetchmybookedrooms", async (req, res) => {
  const result = await BookedroomDetails.find({ whoBooked: req.session.email }, {});
  res.json(result)
})






app.listen(4000)
