const mongoose = require("mongoose");
// user SignUp details schema
const userDetailSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userId: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    },
    password: {
        type: String
    },
    userType: {
        type: String
    },
    dob: {
        type: Date,
    },
    country: {
        type: String
    },
    city: {
        type: String
    },
    gender: {
        type: String
    },
    profile: {
        data: Buffer,
        contentType: String
    },
    address:{
        street:{
            type:String
        },
        city:{
            type:String
        },
        country:{
            type:String
        }
    },
    updated: {
        type: Date,
        default: Date.now
    }

})

const UserDetail = mongoose.model("UserDetail", userDetailSchema)

const roomsdetailschema = new mongoose.Schema({
    propertyId: {
        type: Number,
    },
    owner: {
        type: String,
    },
    propertyName: {
        type: String
    },
    address: {
        city: {
            type: String
        },
        state: {
            type: String
        },
        country: {
            type: String
        }
    },
    price: {
        type: Number
    },
    size: {
        type: Number
    },
    roomImage: {
        data: Buffer,
        contentType: String
    },
    total: {
        Bedrooms: {
            type: Number
        },
        Bathrooms: {
            type: Number
        },
        Allowedpeople: {
            type: Number,
        }
    },
    roomDescription: {
        type: String
    },
    desclaimer: {
        type: String
    },
    updated: {
        type: Date,
        default: Date.now
    },
    amenities: {
        indoor: {
            type: []
        },
        outdoor: {
            type: []
        },
        essentials: {
            type: []
        }
    }



})
const HostedRoomDetails = new mongoose.model("Hostedroomdetails", roomsdetailschema)

module.exports = { UserDetail }
