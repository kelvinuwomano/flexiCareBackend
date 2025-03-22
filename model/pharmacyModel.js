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
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pharmacyProfile"
    },
    role: {type: String, default: "user"},
    isVerified : {
        type: Boolean,
        default: false
    },
    verificationToken: String,
    verificationTokenExpires: Date,
    resetToken: String,
    resetTokenExpires: Date
   
},
{timestamps: true}
);

module.exports = mongoose.model("pharmacy", pharmacySchema)

