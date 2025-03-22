const express = require("express");
const { createOrUpdateProfilePharmacy } = require("../controllers/pharmacyProfile");




const pharmacyProfileRoute = express.Router();

pharmacyProfileRoute.post("/create", createOrUpdateProfilePharmacy)




module.exports = pharmacyProfileRoute