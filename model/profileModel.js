const mongoose = require("mongoose");



const profileSchema = new mongoose.Schema({
    gender: String,
    age: Number,
    adress: String,
    location: {
        state: String,
        localGovernment: String,
        city: String
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient",
    }
}, { timestamps: true});

module.exports = mongoose.model("profile", profileSchema)