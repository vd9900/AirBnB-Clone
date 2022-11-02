const express = require("express")
const bodyParser = require("body-parser")
const moongose = require("mongoose")
const path = require("path");
const bcrypt = require("bcrypt")
const multer = require('multer');
var session = require('express-session')
const { default: mongoose } = require("mongoose");
const app = express();
const appRouter = express.Router();

const { signinPOST} = require("./routes/signin")
const { loginGET, loginPOST } = require("./routes/login")
const { UserDetail, HostedRoomDetails, BookedroomDetails } = require("./Schemas/schema")

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


// SignUp & Login page
appRouter.route("/login").get(loginGET).post(loginPOST)

appRouter.route("/signin").post(signinPOST)

const lll = {
  name: "vinith",

}
app.get('/home', function (req, res) {
  if (req.session.isAuth) {
    res.sendFile(path.join(__dirname, '../views/home.html'));
    // console.log(req.session.isAuth);
    // console.log(req.session.username);
    // console.log(req.session.email);
  } else {
    res.redirect("/login")
  }
});
// home page
// appRouter.route("/").get(homeGET) 


// app.post("/signin", 
//   })
// })

// logout page
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.send("try again later")
    } else {
      res.redirect("/login")
    }
  })
})


//Hoster page
// appRouter.route("/hoster").get(productGET)
app.get("/hoster", (req, res) => {
  if (req.session.isAuth) {
    res.sendFile(path.join(__dirname, "../views/hoster.html"))
  } else {
    res.redirect("/login")
  }
  console.log(req.session.isAuth)
})



app.post("/hoster", gallery, async (req, res) => {
  let properityId = 0;

  if (await HostedRoomDetails.count({}) == 0) {
    properityId = 1;
  } else {
    let newPropertiyId = await HostedRoomDetails.findOne().sort('-_id')
    properityId = newPropertiyId.propertyId + 1;
  }
  // push images one by one into array
  let imageData = [];
  // for (let i = 0; i < req.files.length; i++) {
  //     imageData.push(req.files[i].filename);
  // }
  // console.log(req.files);

  const newHostedRoomDetails = new HostedRoomDetails({
    propertyId: properityId,
    owner: req.session.username,
    propertyName: req.body.propertyName,
    address: {
      city: req.body.city,
      state: req.body.state,
      country: req.body.country
    },
    price: req.body.price,
    size: req.body.size,
    roomImage: imageData,
    total: {
      Bedrooms: req.body.totalBedrooms,
      Beds: req.body.totalBeds,
      Bathrooms: req.body.totalBathrooms,
      Allowedpeople: req.body.totalGuest
    },
    mainTitle: req.body.mainTitle,
    roomDescription: req.body.description,
    amenities: {
      indoor: req.body.indoor,
      outdoor: req.body.outdoor,
      essentials: req.body.essentials
    }




  })//.save((err) => {
  //   if (err) {
  //     res.send(`Something went Wrong try again😭 <a href="http://localhost:4000/home">back to home</a>`)
  //   } else {
  //     res.send(`<h2>Your post successfully added😊 <a href="http://localhost:4000/home">back to home</a><h2>`)
  //   }
  // })
})

//Product page
// appRouter.route("/product").get(productGET)
app.get("/property/:id", (req, res) => {
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
})

// booking conformation page
// my booking  page
app.get("/mybookings", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/mybookings.html"))
})
// my booking details  page

app.get("/mybooking/details", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/bookingdeatils.html"))
})
app.get("/property/bookingconf", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/bookingconf.html"))
})

//contact page
app.get("/help", (req, res) => {
  res.sendFile(path.join(__dirname, "../views/help.html"))
})
// appRouter.route("/contact").get(contactGET)

// Admin page
// appRouter.route("/Admin").get(adminGET)

// conformation page
app.post("/property/bookingconf", (req, res) => {
  console.log(req.body);
  if (req.session.bookedRoom) {
    delete req.session.bookedRoom;
  }
  req.session.bookedRoom = req.body

  res.sendFile(path.join(__dirname, "../views/bookingconf.html"))
})

//conformed page
app.get("/conformed", (req, res) => {
  console.log(req.session)
  const newBookedroomDetails = new BookedroomDetails({
    GuestName: req.session.bookedRoom.GuestName,
    whoBooked: req.session.email,
    CheckIn: req.session.bookedRoom.CheckIn,
    CheckOut: req.session.bookedRoom.CheckOut,
    Nop: req.session.bookedRoom.Nop,
    Non: req.session.bookedRoom.Non,
    Payment: req.session.bookedRoom.Payment,
    roomDetails: {
      propertyId: req.session.clickedpro,
      propertyName: req.session.bookedRoom.propertyName,
      city: req.session.bookedRoom.city,
      country: req.session.bookedRoom.country,
      updated: req.session.bookedRoom.updated,
    }
  }).save(
    (err) => {
      if (!err) {
        res.send(`<h3>Awesome... your rocked🤩 booking conformed <br> <a href="http://localhost:4000/mybookings">Go to my booking</a></h3>`)
      } else {
        res.send(`<h3>Something went wrong Try again later <br> <a href="http://localhost:4000/home">Go to home page</a></h3>`)
      }
    }
  )
})

// properity page showing to user

// fecthing data to front-end
app.get("/fetchproperties", async (req, res) => {
  const result = await HostedRoomDetails.find({}, {})
  res.json(result)

})
app.get("/fetchproperty", async (req, res) => {
  const result = await HostedRoomDetails.findOne({ propertyId: req.session.clickedpro }, {})
  res.json(result)
})
app.get("/fetchbookedRoom", async (req, res) => {
  const result = await HostedRoomDetails.findOne({ propertyId: req.session.clickedpro }, {})
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

app.get("/fetchmybookedrooms", async (req, res) => {
  const result = await BookedroomDetails.find({ whoBooked: req.session.email }, {});
  res.json(result)
})

app.listen(4000)
