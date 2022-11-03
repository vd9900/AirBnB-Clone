const express = require("express")
var session = require('express-session')
const bodyParser = require("body-parser")
const path = require('path')
const multer = require('multer');
const { HostedRoomDetails } = require("../Schemas/schema")

const app = express();
const Router = express.Router();

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


// image storing path
const galleryStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './views/assets');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.parse(file.originalname).name + path.extname(file.originalname));
    }
})

const gallery = multer({ storage: galleryStorage }).array("files",5)

Router.get("/",(req, res)=> {
    if (req.session.isAuth) {
        res.sendFile(path.join(__dirname, "../views/hoster.html"))
    } else {
        res.redirect("/login")
    }
    console.log(req.session.isAuth)
})

Router.post("/",gallery,async (req, res)=> {
    let properityId = 0;
    if (await HostedRoomDetails.count({}) == 0) {
        properityId = 1;
    } else {
        let newPropertiyId = await HostedRoomDetails.findOne().sort('-_id')
        properityId = newPropertiyId.propertyId + 1;
    }
    // push images one by one into array
    let imageData = [];
    for (let i = 0; i < req.files.length; i++) {
        imageData.push(req.files[i].filename);
    }
    console.log(imageData)
     console.log(properityId)
    console.log(req.session);
    console.log(req.body);
    
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




    })//./save((err) => {
    res.send(`Something went Wrong try again😭 <a href="http://localhost:4000/home">back to home</a>`)
    //     if (err) {
    //     } else {
    //         res.send(`<h2>Your post successfully added😊 <a href="http://localhost:4000/home">back to home</a><h2>`)
    //     }
    // })
})


module.exports =  Router 