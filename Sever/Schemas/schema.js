const mongoose = require("mongoose");
// user SignUp details schema
const userDetailSchema = new mongoose.Schema({
    name: {
        type: String
    },
    userName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
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
    time: {
        type: Date,
        default: Date.now
    }

})

const UserDeatail = mongoose.model("UserDetail", userDetailSchema)

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
        contentType:String
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
    amenities:{
        indoor:{
            type:[]
        },
        outdoor:{
            type:[]
        },
        essentials:{
            type:[]
        }
    }



})
const HostedRoomDetails = new mongoose.model("Hostedroomdetails",roomsdetailschema)

