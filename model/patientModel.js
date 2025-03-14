const mongoose = require("mongoose");


const patientSchema = new mongoose.Schema({
    fullName: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNo: {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetToken: String,
    resetTokenExpires: Date,
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    }
});

module.exports = mongoose.model("patient", patientSchema)