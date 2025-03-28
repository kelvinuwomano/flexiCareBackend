const express = require("express");
const { createOrUpdateProfilePharmacy } = require("../controllers/pharmacyProfile");
const { protect } = require("../middleware/authMiddleware");




const pharmacyProfileRoute = express.Router();

pharmacyProfileRoute.post("/create", protect, createOrUpdateProfilePharmacy)




module.exports = pharmacyProfileRoute