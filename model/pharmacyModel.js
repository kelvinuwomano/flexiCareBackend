const mongoose = require("mongoose");


const pharmacySchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetToken: String,
    resetTokenExpires: Date
   
});

module.exports = mongoose.model("pharmacy", pharmacySchema)

