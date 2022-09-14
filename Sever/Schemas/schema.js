const mongoose = require("mongoose");

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