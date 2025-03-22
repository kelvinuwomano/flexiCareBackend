const express = require("express");
const { createPharmacy, verifyPharmacy, signin } = require("../controllers/pharmacyController");


const pharmacyRouter = express.Router();

pharmacyRouter.post("/signup", createPharmacy)
pharmacyRouter.get("/verify/:token", verifyPharmacy)
pharmacyRouter.post("/signin", signin)


module.exports = pharmacyRouter