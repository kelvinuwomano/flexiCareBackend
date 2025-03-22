const mongoose = require("mongoose");


const adminSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true, required: true},
    password : {type : String, required : true},
    role: {type: String, default: "admin"}
},
    {timestamps: true}
);


module.exports = mongoose.model("admin", adminSchema)