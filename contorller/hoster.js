
const { HostedRoomDetails } = require("../Schemas/schema")

function hosterGET(req, res) {
    if (req.session.isAuth) {
        res.sendFile(path.join(__dirname, "../views/hoster.html"))
    } else {
        res.redirect("/login")
    }
    console.log(req.session.isAuth)
}


async function hosterPOST(req, res) {
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




    }).save((err) => {
        if (err) {
            res.send(`Something went Wrong try again😭 <a href="http://localhost:4000/home">back to home</a>`)
        } else {
            res.send(`<h2>Your post successfully added😊 <a href="http://localhost:4000/home">back to home</a><h2>`)
        }
    })
}


module.exports = { hosterGET, hosterPOST }