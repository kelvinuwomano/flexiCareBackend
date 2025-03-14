const mongoose = require("mongoose");



const profileSchema = new mongoose.Schema({
    gender: String,
    age: Number,
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "profile"
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    }
});

module.exports = mongoose.model("profile", profileSchema)