const mongoose = require("mongoose");


const pharmacyProfileModel = new mongoose.Schema({
    phoneNumber: String,
    description: String,
    licenseNumber: {type:String, required: true, unique: true},
    address: String,
    location: {
        state: String,
        localGovernment: String,
        city: String
    },
    pharmacy : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pharmacy"
    }

}, {timestamps: true});


module.exports = mongoose.model("pharmacyProfile", pharmacyProfileModel)