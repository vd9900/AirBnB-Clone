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
    address: {
        street: {
            type: String
        },
        city: {
            type: String
        },
        country: {
            type: String
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
        type: Array
    },
    total: {
        Bedrooms: {
            type: Number
        },
        Beds: {
            type: Number
        },
        Bathrooms: {
            type: Number
        },
        Allowedpeople: {
            type: Number,
        }
    },
    mainTitle: {
        type: String
    },
    roomDescription: {
        type: String
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
    },
    updated: {
        type: Date,
        default: Date.now
    }




})



const HostedRoomDetails = new mongoose.model("Hostedroomdetails", roomsdetailschema)

const bookedRoomDetails = mongoose.Schema({
    GuestName: String,
    whoBooked: String,
    CheckIn: String,
    CheckOut: String,
    Nop: String,
    Non: String,
    Price:Number,
    Payment: String,
    roomDetails: {
        propertyId: String,
        propertyName: String,
        mainTitle:String,
        city: String,
        country: String,
        updated: String,
    },
    updated: {
        type: Date,
        default: Date.now
    }


})

const BookedroomDetails = new mongoose.model("BookedroomDetails", bookedRoomDetails)

const reviewDetials = new mongoose.Schema({
    userName: String,
    propertyId: Number,
    rating: Number,
    totalrating: Number,
    Description: String,
    updated: {
        type: Date,
        default: Date.now
    }

})
const ReviewDetails = new mongoose.model("reviewDetails", reviewDetials)
module.exports = { UserDetail, HostedRoomDetails, BookedroomDetails, ReviewDetails }
