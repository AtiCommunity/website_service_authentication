const mongoose = require("mongoose")
const { Schema } = mongoose;
const validator = require("validator");

const userModel = new Schema({
    type: {
        lowercase: true,
        required: [true, "Type is a required field"],
        trim: true,
        type: String,
    },
    firstname: {
        required: [true, "Firstname is a required field"],
        type: String,
    },
    surname: {
        required: [true, "Surname is a required field"],
        type: String,
        uppercase: true,
    },
    email: {
        lowercase: true,
        required: [true, "Email is a required field"],
        trim: true,
        type: String,
        unique: true,
        validate: [validator.isEmail, "Please enter a valid E-mail!"],
    },
    password: {
        required: [true, "Password is a required field"],
        type: String,
    },
})

module.exports = mongoose.model("User", userModel)