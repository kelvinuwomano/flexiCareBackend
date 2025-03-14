const mongoose = require("mongoose");


const locationSchema = new mongoose.Schema({
    residentialAddress : String,
    zipCode: Number,
    state: String,
    localGovernment: String,
    country: String,
    profile:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patient"
    },
    

})